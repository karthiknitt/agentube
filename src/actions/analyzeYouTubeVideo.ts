"use server";

import { getvideoIdFromURL } from "@/lib/getvideoIdFromURL";
import { redirect } from "next/navigation";

export default async function analyzeYouTubeVideo(formData: FormData) {
  const url = formData.get("url")?.toString();
  if (!url) return;
  const videoId = getvideoIdFromURL(url);
  if (!videoId) return;
  //Redirect to the new Post
  redirect(`/video/${videoId}/analysis`);
}
