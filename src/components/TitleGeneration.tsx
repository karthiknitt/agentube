"use client";
import { useUser } from "@clerk/nextjs";
import Usage from "./Usage";
import { FeatureFlag } from "@/features/flags";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { Copy } from "lucide-react";
//FIXME:Temporary type definition to allow the build to pass

interface Title {
  _id: string;
  title: string;
  // other properties
}
function TitleGeneration({ videoId }: { videoId: string }) {
  const { user } = useUser();
  const titles: Title[] = []; //TODO: Pull from Convex DB. ALso added a temporary type definition above to allo the build to pass
  const { value: isTitleGenerationEnabled } = useSchematicEntitlement(
    FeatureFlag.TITLE_GENERATIONS
  );
  //FIXME:Temporary console.log to use above variables to proceed with the build without eslint ewrrors
  console.log(videoId, user, titles);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    //toast.success("Copied to clipboard");
  };
  return (
    <div className="border-gray-200 rounded-xl bg-white shadow-sm p-4 border">
      <div className="min-w-52">
        <Usage title="Titles" featureFlag={FeatureFlag.TITLE_GENERATIONS} />
      </div>
      {/* Simple Horizontal scrolling for images */}
      <div className={`flex overflow-x-auto gap-4 ${titles?.length}&&"mt-4"}`}>
        {titles?.map((title) => (
          <div
            key={title._id}
            className="group-relative p-4 rounded-lg border border-gray-100 bg-gray-50 hover:border-blue-50 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm  text-gray-900 leading-relaxed">
                {title.title}
              </p>
              <button
                onClick={() => copyToClipboard(title.title)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 hover:bg-blue-100 rounded-md"
                title="Copy to ClipBoard"
              >
                <Copy className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No title generated yet */}
      {!titles?.length && !!isTitleGenerationEnabled && (
        <div className="text-center py-8 px-4 rounded-lg mt-4 border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No titles have been generated yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Generate titles to see them appear here
          </p>
        </div>
      )}
    </div>
  );
}
export default TitleGeneration;
