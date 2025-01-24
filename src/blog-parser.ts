import Parser from 'rss-parser';
import { delay, getLiveUrls } from './utils';

// Define the structure of a blog post
interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  category?: string[] | undefined; // Categories are optional
}

// Parse a blog RSS feed and return an array of all new posts
export async function blogParser(url: string): Promise<BlogPost[]> {
  const parser = new Parser({
    //timeout: 4000,
    headers: { 'User-Agent': 'something different' }
  });
  const writeups: BlogPost[] = [];

  try {
    // Parse the RSS feed
    const feed = await parser.parseURL(url);

    // Map items to BlogPost objects
    feed.items.forEach((item) => {
      if (item.title && item.link && item.pubDate) {
        writeups.push({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          // if categories exist then add them otherwise check for category field and add them
          category: item.categories?.length && item.categories[0] ? item.categories : item.category || [] // if it
        });
      }
    });

    return writeups;
  } catch (error) {
    console.error(`Error while parsing: ${(error as Error).message}`);
    return [];
  }
}

// Function to fetch data from a single URL with a delay
// const fetchData = async (url: string): Promise<void> => {
//   try {
//     return await axios.get(url);
//     //console.log(`Response from ${url}:`, response.data);
//   } catch (error) {
//     console.error(`Error fetching data from ${url}:`, error);
//   }
// };

// interface ApiResponse {
//   id: number; // Example field
//   name: string; // Example field
//   status: string; // Example field
//   [key: string]: any; // For any additional fields (optional)
// }

// const fetchData = async (url: string): Promise<ApiResponse | null> => {
//   try {
//     const response: AxiosResponse<ApiResponse> = await axios.get(url);
//     const data = response.data;

//     // Extract only the fields you want to return
//     const extractedData: ApiResponse = {
//       id: data.title,
//       name: data.link,
//       status: data.status
//       // Add other fields as needed
//     };

//     return extractedData;
//   } catch (error) {
//     console.error(`Error fetching data from ${url}:`, error);
//     return null; // Return `null` in case of an error
//   }
// };

//****** */
// export const fetchBlogsByDelay = async (urls: string[], delayMs: number): Promise<void> => {
//   const liveUrls = await getLiveUrls(urls);

//   console.log('liveUrls', liveUrls);

//   for (let i = 0; i < liveUrls.length; i++) {
//     const res = await blogParser(liveUrls[i]);
//     console.log(liveUrls[i], res);

//     // only delay if the url is not the last in array
//     if (i < liveUrls.length - 1) {
//       console.log(`Waiting for ${delayMs} ms before the next request...`);
//       await delay(delayMs); // Delay for the specified time (in ms)
//     }
//   }
// };
export const fetchBlogsByDelay = async (urls: string[], delayMs: number): Promise<BlogPost[]> => {
  const liveUrls = await getLiveUrls(urls);

  console.log('Live URLs:', liveUrls);

  const allParsedBlogs: BlogPost[] = [];

  for (let i = 0; i < liveUrls.length; i++) {
    const parsedBlogs = await blogParser(liveUrls[i]);

    if (parsedBlogs.length > 0) {
      allParsedBlogs.push(...parsedBlogs);
    }

    console.log(`Fetched and parsed blogs from: ${liveUrls[i]}`);

    // Only delay if not the last URL in the list
    if (i < liveUrls.length - 1) {
      console.log(`Waiting for ${delayMs} ms before the next request...`);
      await delay(delayMs);
    }
  }

  return allParsedBlogs;
};

// const mediumTags = setupMediumTags();
// const mediumUsers = setupMediumUsers();

// TODO:
// things to condisder:
// mediumUsers hit rate-limit (429 status) pretty quickly
// probably increase the delay for it more than the others

// since it's just blogposts we can increase the delay so much no problem
// add some behaviours to mimic browser request (user-agent, headers, etc)

// Start fetching with a delay of 1000 ms (1 second)
//fetchBlogsByDelay([...mediumTags, ...mediumUsers, ...RSS_BLOGS], 500)

// fetchBlogsByDelay([...RSS_BLOGS], 500)
//   .then(() => console.log('All requests completed successfully.'))
//   .catch((error) => console.error('An error occurred during the request processing:', error));
