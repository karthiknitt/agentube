//import { NextResponse } from "next/server";
import getVideoDetails from "@/actions/getVideoDetails";
import { createAnthropic } from "@ai-sdk/anthropic";
import { currentUser } from "@clerk/nextjs/server";
import { streamText, tool } from "ai";
import { NextResponse } from "next/server";

import fetchTranscript from "../../../../tools/fetchTranscript";

const key = process.env.CLAUDE_API_KEY;
// console.log("key:\n", key);
const anthropic = createAnthropic({
  apiKey: key,
  headers: {
    "anthropic-beta": "token-efficient-tools-2025-02-19",
  },
});
// console.log("Anthropic:\n", anthropic);
const model = anthropic("claude-3-7-sonnet-20250219");
// console.log("Model:\n", model);
export async function POST(req: Request) {
  const { messages, videoId } = await req.json();
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const videoDetails = await getVideoDetails(videoId);

  const systemMessage = `You are an AI assistant ready to accept questions from the user about ONE specific video.
  The video id in question is ${videoId} but you will refer to it as ${
    videoDetails?.title || "Selected Video"
  }.
  Use emojis to make the conversation more engaging. If an error occurs, explain it to the user,
  and ask them to try again later. If the error suggests that the user upgrade, explain that they must upgrade to use the feature,
  tell them to go to 'Manage Plan' in the header and upgrade.If any tool is used, analyze the response,and if it contains
  a cache,explain that the transcript is cached because they previously transcribed a video, saving the user a token.
  Use words like database instead of cache to make it more easy to understand. Format for notion.`;

  //   console.log("VID:\n", videoId);
  const result = streamText({
    model,
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      ...messages,
    ],
    tools: {
      fetchTranscript: fetchTranscript,
    },
  });
  return result.toDataStreamResponse();
}
