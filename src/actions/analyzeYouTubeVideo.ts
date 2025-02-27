"use server";

import { redirect } from "next/navigation";

export default async function analyzeYouTubeVideo(formData: FormData) {
  const url = formData.get("url")?.toString();
  if (!url) return;
  const videoId = "abc"; //TODO: FIX THIS
  if (!videoId) return;
  //Redirect to the new Post
  redirect(`/video/${videoId}/analysis`);
}
