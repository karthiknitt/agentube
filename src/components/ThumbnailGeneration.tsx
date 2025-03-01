"use client";
import { useUser } from "@clerk/nextjs";
import Usage from "./Usage";
import { FeatureFlag } from "@/features/flags";
import Image from "next/image";
function ThumbnailGeneration({ videoId }: { videoId: string }) {
  const { user } = useUser();
  const images = []; //TODO: Pull from Convex DB

  return (
    <div className="rounded-xl flex flex-col p-4 border">
      <div className="min-w-52">
        <Usage
          title="Thumbnail Generation"
          featureFlag={FeatureFlag.IMAGE_GENERATION}
        />
      </div>
      {/* Simple Horizontal scrolling for images */}
      <div className={`flex overflow-x-auto gap-4 ${images?.length}&&"mt-4"}`}>
        {images?.map(
          (image) =>
            image.url && (
              <div
                key={image._id}
                className="flex-none w-[200px] h-[110px] rounded-lg overflow-x-auto"
              >
                <Image
                  src={image.url}
                  alt="Generated Thumbnail"
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
            )
        )}
      </div>

      {/* No images generated yet */}
      {!images?.length && (
        <div className="text-center py-8 px-4 rounded-lg mt-4 border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No thumbnails have been generated yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Generate thumbnails to see them appear here
          </p>
        </div>
      )}
    </div>
  );
}
export default ThumbnailGeneration;
