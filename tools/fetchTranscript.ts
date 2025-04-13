import { tool } from "ai";
import { z } from "zod";

const fetchTranscript = (videoId: string) =>
  tool({
    description: "Fetch the transcript of an YouTube Video in segments",
    parameters: z.object({
      videoId: z.string().describe("The video ID to fetch the transcript for"),
    }),
  });
