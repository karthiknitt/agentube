import { getYouTubeTranscript } from "@/actions/getYouTubeTranscript";
import { tool } from "ai";
import { z } from "zod";

const fetchTranscript = tool({
  description: "Fetch the transcript of an YouTube Video in segments",
  parameters: z.object({
    videoId: z.string().describe("The video ID to fetch the transcript for"),
  }),
  execute: async ({ videoId }) => {
    const transcript = await getYouTubeTranscript(videoId);
    return {
      transript: transcript.transcript,
      cache: transcript.cache,
    };
  },
});
export default fetchTranscript;
