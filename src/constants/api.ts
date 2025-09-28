export const YOUTUBE_VIDEOS_API: string = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=50&regionCode=IN&chart=mostPopular&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;
export const YOUTUBE_SEARCH_API: string = `http://suggestqueries.google.com/complete/search?client=firefox&q=`;
