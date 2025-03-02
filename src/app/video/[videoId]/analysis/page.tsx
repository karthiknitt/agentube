"use client";

import Usage from "@/components/Usage";
import YoutubeVideoDetails from "@/components/YoutubeVideoDetails";
import ThumbnailGeneration from "@/components/ThumbnailGeneration";
import { FeatureFlag } from "@/features/flags";
// import { string } from "@schematichq/schematic-typescript-node/core/schemas";
import { useParams } from "next/navigation";
import TitleGeneration from "@/components/TitleGeneration";
import Transcription from "@/components/Transcription";
import AIAgentChat from "@/components/AIAgentChat";

const AnalysisPage = () => {
  const params = useParams<{ videoId: string }>();
  const { videoId } = params;

  return (
    //   Container
    <div className="xl:container mx-auto p-4 md:px-0 ">
      {/* Div that encapsulates left and right sides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side */}

        <div className="order-2 lg:order-1 bg-white flex flex-col gap-4 lg:broder-r border-gray-200 p-6">
          {/* Analysis Page */}
          <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-xl">
            <Usage
              title="Analyze Video"
              featureFlag={FeatureFlag.ANALYSE_VIDEO}
            />

            {/* YouTube Transcription Status */}

            {/* YouTube Video Details */}
            <YoutubeVideoDetails videoId={videoId} />
          </div>

          {/* Thumbnail Generation */}
          <ThumbnailGeneration videoId={videoId} />
          {/* Title Generation  */}
          <TitleGeneration videoId={videoId} />
          {/* Transcription  */}
          <Transcription videoId={videoId} />
        </div>
        {/* Right Side */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)]">
          {/* AI Agent Chat Section  */}
          <AIAgentChat videoId={videoId} />
        </div>
      </div>
    </div>
  );
};
export default AnalysisPage;
