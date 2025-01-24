import 'dotenv/config';
import { Command } from 'commander';
import { addBlogPosts, BlogPost, filterNewPosts, initializeDataFile } from './storage';
import { RSS_BLOGS, setupMediumTags, setupMediumUsers } from './resources';
import { fetchBlogsByDelay } from './blog-parser';
import { delay, formatMessage } from './utils';
import { createNotificationService } from './notification';
import { cronSchedule } from './cron-scheduler';

// Define CLI
const program = new Command();

// Default configurations
let DEFAULT_FETCH_DELAY = parseInt(process.env.FETCH_DELAY_MS || '200', 10);
let DEFAULT_NOTIFICATION_DELAY = parseInt(process.env.NOTIFICATION_DELAY_MS || '1000', 10);
let DEFAULT_NOTIFICATION_SERVICE = process.env.NOTIFICATION_SERVICE || 'telegram';

// Helper function to apply global options
function applyGlobalOptions(program: Command): void {
  const options = program.opts();
  DEFAULT_FETCH_DELAY = parseInt(options.fetchDelay, 10);
  DEFAULT_NOTIFICATION_DELAY = parseInt(options.notificationDelay, 10);
  DEFAULT_NOTIFICATION_SERVICE = options.service;
}

// Hook to apply global options before any command is executed
program.hook('preAction', () => {
  applyGlobalOptions(program);
});

// Shared fetch and notify logic
const fetchAndNotify = async () => {
  console.log('Fetching and parsing RSS feeds...');
  const allBlogPosts: BlogPost[] = [];

  // Fetch from all sources
  const rssBlogsPosts = await fetchBlogsByDelay([...RSS_BLOGS], DEFAULT_FETCH_DELAY);
  const mediumTagPosts = await fetchBlogsByDelay([...setupMediumTags()], DEFAULT_FETCH_DELAY);
  const mediumUserPosts = await fetchBlogsByDelay([...setupMediumUsers()], DEFAULT_FETCH_DELAY);

  allBlogPosts.push(...rssBlogsPosts);
  allBlogPosts.push(...rssBlogsPosts, ...mediumTagPosts, ...mediumUserPosts);

  console.log('Identifying new posts...');
  const newPosts = await filterNewPosts(allBlogPosts);

  if (newPosts.length > 0) {
    console.log(`Found ${newPosts.length} new posts. Sending notifications...`);
    const notificationService = createNotificationService();
    for (const post of newPosts) {
      //await notificationService.sendNotification(`New Blog Post: ${post.title}\n${post.link}`);
      const message = formatMessage(post);
      await notificationService.sendNotification(message);
      await delay(DEFAULT_NOTIFICATION_DELAY);
    }
    console.log('Notifications sent. Updating data file...');
    await addBlogPosts(newPosts);
  } else {
    console.log('No new posts found.');
  }
};

// Add CLI Commands
program.name('Writeup Notifier').description('CLI tool to manage blog notifications').version('1.0.0');

// Global options (apply to all commands)
program
  .option('--fetch-delay <ms>', 'Delay between fetch requests (ms)', DEFAULT_FETCH_DELAY.toString())
  .option('--notification-delay <ms>', 'Delay between notifications (ms)', DEFAULT_NOTIFICATION_DELAY.toString())
  .option('--service <name>', 'Notification service to use (telegram, discord)', DEFAULT_NOTIFICATION_SERVICE);

// Initialize Data Command
program
  .command('init')
  .description('Initialize the data file')
  .action(async () => {
    console.log('Initializing data file...');
    await initializeDataFile();
    console.log('Data file initialized successfully.');
  });

// Fetch and Notify (One-Time Execution)
program
  .command('run')
  .description('Fetch blogs and send notifications (one-time execution)')
  .action(async () => {
    await fetchAndNotify();
  });

// Schedule Cron Job
program
  .command('schedule')
  .description('Schedule a cron job to run fetchAndNotify at intervals')
  .argument('<cronValue>', 'Cron interval (e.g., 30m, 2h, 1d)')
  .action(async (cronValue: string) => {
    console.log(`Scheduling cron job to run every ${cronValue}...`);
    await cronSchedule(cronValue, fetchAndNotify);
  });

// Run CLI
program.parse(process.argv);
