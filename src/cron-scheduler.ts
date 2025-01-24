import { CronJob } from 'cron';

export async function cronSchedule(cronValue: string, callback: () => Promise<void>): Promise<void> {
  // Extract unit and number from the cronValue
  const cronUnit = cronValue.slice(-1);
  const cronNumber = parseInt(cronValue.slice(0, -1), 10);

  if (isNaN(cronNumber) || cronNumber <= 0) {
    throw new Error(`Invalid cron value: ${cronValue}. Must be a positive number followed by 'h', 'd', or 'm'.`);
  }

  let cronSchedule: string;

  // Map the cronValue to a valid cron schedule
  switch (cronUnit) {
    case 'h': // Every <cronNumber> hours
      cronSchedule = `0 */${cronNumber} * * *`;
      break;
    case 'd': // Every <cronNumber> days
      cronSchedule = `0 0 */${cronNumber} * *`;
      break;
    case 'm': // Every <cronNumber> minutes
      cronSchedule = `*/${cronNumber} * * * *`;
      break;
    default:
      throw new Error('Invalid cron job unit. Use h (hours), d (days), or m (minutes).');
  }

  // Execute the task immediately
  console.log(`[+] ${new Date().toISOString()} - Running the task immediately...`);
  await callback();

  // Create and start the cron job
  const job = new CronJob(cronSchedule, async () => {
    console.log(`[+] ${new Date().toISOString()}`);
    console.log(`Cron job triggered. Running your task named ${callback.name}...`);
    await callback();
  });

  job.start();
  console.log(`Cron job scheduled: ${cronValue} (${cronSchedule})`);
}
