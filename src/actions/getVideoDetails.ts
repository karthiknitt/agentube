"use server";
import { google } from "googleapis";
import { VideoDetails } from "../../types/VideoDetails";
const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});
async function getVideoDetails(videoId: string) {
  console.log("fetching video details for :", videoId);
  try {
    const videoResponse = await youtube.videos.list({
      part: ["snippet", "statistics"],
      id: [videoId],
    });
    const videoDetails = videoResponse.data.items?.[0];
    if (!videoDetails) throw new Error("Video not found");
    // if(videoDetails)
    const channelResponse = await youtube.channels.list({
      part: ["snippet", "statistics"],
      id: [videoDetails.snippet?.channelId || ""],
    });

    const channelDetails = channelResponse.data.items?.[0];
    console.log("Channel Details fetched succesfully", channelDetails);
    const video: VideoDetails = {
      title: videoDetails.snippet?.title || "Unknown Title",

      thumbnail:
        videoDetails.snippet?.thumbnails?.maxres?.url ||
        videoDetails.snippet?.thumbnails?.high?.url ||
        videoDetails.snippet?.thumbnails?.default?.url ||
        "",
      publishedAt:
        videoDetails.snippet?.publishedAt || new Date().toISOString(),

      //Video Metrics

      views: videoDetails.statistics?.viewCount || "0",
      likes: videoDetails.statistics?.likeCount || "Not Available",
      comments: videoDetails.statistics?.commentCount || "Not Available",
      channel: {
        title: videoDetails.snippet?.channelTitle || "Unknown Channel",
        thumbnail: channelDetails?.snippet?.thumbnails?.default?.url || "",
        subscribers: channelDetails?.statistics?.subscriberCount || "0",
      },
    };
    return video;
  } catch (error) {
    console.error("Error fetching Video Details.", error);
    return null;
  }
}

export default getVideoDetails;
