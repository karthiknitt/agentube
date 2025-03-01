import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const getImages = query({
  args: {
    userId: v.string(),
    videoId: v.string(),
  },
  handler: async (ctx, args) => {
    const images = await ctx.db
      .query("images")
      .withIndex("by_user_id_and_video_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.eq(q.field("videoId"), args.videoId))
      .collect();

    const imageUrls = await Promise.all(
      images.map(async (image) => ({
        ...image,
        url: await ctx.storage.getUrl(image.storageId),
      }))
    );
    return imageUrls;
  },
});
