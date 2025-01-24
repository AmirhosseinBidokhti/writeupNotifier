import dns from 'dns';
import axios from 'axios';

// Returns a promise that resolves after a specified number of milliseconds.
export const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

// Function to check if a domain resolves via DNS
export const isDomainLiveViaDNS = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const hostname = new URL(url).hostname;
    dns.lookup(hostname, (err) => {
      resolve(!err); // Resolve true if no error, false otherwise
    });
  });
};

// Function to filter live URLs
export const getLiveUrls = async (urls: string[]): Promise<string[]> => {
  // Perform DNS checks for all URLs and collect results
  const resolvedUrls = (
    await Promise.all(
      urls.map(async (url) => {
        const isLive = await isDomainLiveViaDNS(url);
        return isLive ? url : null; // Return the URL if live, otherwise null
      })
    )
  ).filter((url): url is string => url !== null); // Filter out null values

  return resolvedUrls; // Return only the live URLs
};

// Function to check if the URL is reachable via HTTP (HEAD request)
const isURLLiveViaHTTP = async (url: string): Promise<boolean> => {
  try {
    const response = await axios.head(url); // HEAD request only fetches headers
    return response.status >= 200 && response.status < 300; // Check for successful status codes (2xx)
  } catch (error) {
    console.log(error);
    return false; // If any error occurs, the URL is not live
  }
};

// Function to check if a URL is live using both DNS and HTTP checks
export const isURLLive = async (url: string): Promise<boolean> => {
  try {
    const dnsCheck = await isDomainLiveViaDNS(url);
    if (!dnsCheck) {
      console.log(`Domain not resolvable: ${url}`);
      return false;
    }
    const httpCheck = await isURLLiveViaHTTP(url);
    return httpCheck;
  } catch (error) {
    console.error(`Error checking URL: ${url}`, error);
    return false;
  }
};
