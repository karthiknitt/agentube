export enum FeatureFlag {
  TRANSCRIPTION = "transcription",
  IMAGE_GENERATION = "image-generations",
  TITLE_GENERATIONS = "title-generations",
  ANALYSE_VIDEO = "analyse-video",
  SCRIPT_GENERATION = "script-generations",
}

export const featureFlagEvents: Record<FeatureFlag, { event: string }> = {
  [FeatureFlag.TRANSCRIPTION]: { event: "transcribe" },
  [FeatureFlag.IMAGE_GENERATION]: { event: "generate-image" },
  [FeatureFlag.TITLE_GENERATIONS]: { event: "generate-title" },
  [FeatureFlag.ANALYSE_VIDEO]: { event: "analyse-video" },
  [FeatureFlag.SCRIPT_GENERATION]: { event: "" },
};
