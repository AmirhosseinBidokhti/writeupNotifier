import fs from 'fs-extra';
import path from 'path';

// Define the interface for an RSS Post
export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  categories?: string[];
}

// Path to the JSON file storing the parsed RSS posts
const DATA_FILE_PATH = path.resolve(__dirname, 'rss_data.json');

// Initialize the JSON file if it doesn't exist
export const initializeDataFile = async (): Promise<void> => {
  try {
    const exists = await fs.pathExists(DATA_FILE_PATH);
    if (!exists) {
      await fs.writeJson(DATA_FILE_PATH, []); // Initialize with an empty array
      console.log(`Data file created at: ${DATA_FILE_PATH}`);
    }
  } catch (error) {
    console.error('Error initializing data file:', error);
  }
};

// Read all blog posts from the JSON file
export const readBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const data: BlogPost[] = await fs.readJson(DATA_FILE_PATH);
    //console.log(data);
    return data;
  } catch (error) {
    console.error('Error reading data file:', error);
    return [];
  }
};

// Write updated blog posts to the JSON file
export const writeBlogPosts = async (blogPosts: BlogPost[]): Promise<void> => {
  try {
    await fs.writeJson(DATA_FILE_PATH, blogPosts, { spaces: 2 });
    console.log('Data file updated successfully.');
  } catch (error) {
    console.error('Error writing to data file:', error);
  }
};

// Check if a blog post already exists in the JSON file
export const doesPostExist = async (link: string): Promise<boolean> => {
  try {
    const blogPosts = await readBlogPosts();
    return blogPosts.some((post) => post.link === link);
  } catch (error) {
    console.error('Error checking for post existence:', error);
    return false;
  }
};

// Identify new posts using doesPostExist
export const filterNewPosts = async (allBlogPosts: BlogPost[]): Promise<BlogPost[]> => {
  const newPosts: BlogPost[] = [];

  for (const post of allBlogPosts) {
    //const normalizedLink = post.link.trim().toLowerCase();
    const normalizedLink = post.link.toLowerCase();

    // Check if the post already exists in the database
    const exists = await doesPostExist(normalizedLink);

    if (!exists) {
      newPosts.push(post);
    }
  }

  return newPosts;
};

// Add new blog posts to the JSON file
export const addBlogPosts = async (newPosts: BlogPost[]): Promise<void> => {
  try {
    const existingPosts = await readBlogPosts();
    const uniquePosts = newPosts.filter((post) => !existingPosts.some((existing) => existing.link === post.link));

    if (uniquePosts.length > 0) {
      await writeBlogPosts([...existingPosts, ...uniquePosts]);
      console.log(`${uniquePosts.length} new posts added.`);
    } else {
      console.log('No new posts to add.');
    }
  } catch (error) {
    console.error('Error adding new posts:', error);
  }
};
