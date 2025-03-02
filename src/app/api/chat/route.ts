//import { NextResponse } from "next/server";
import { createAnthropic } from "@ai-sdk/anthropic";
//import { streamText, tool } from "ai";
import { streamText } from "ai";
const anthropic = createAnthropic({
  apiKey: process.env.CLAUDE_API_KEY,
  headers: {
    "anthropic-beta": "token-efficient-tools-2025-02-19",
  },
});
//console.log(anthropic.apiKey);
const model = anthropic("claude-3-7-sonnet-20250219");

export async function POST(req: Request) {
  const { messages, videoId } = await req.json();

  const result = streamText({
    model,
    messages,
  });
  console.log(messages, videoId);
  return result.toDataStreamResponse();
}
