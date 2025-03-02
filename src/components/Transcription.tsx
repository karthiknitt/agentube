"use client";

import Usage from "./Usage";
import { FeatureFlag } from "@/features/flags";
import { useSchematicEntitlement } from "@schematichq/schematic-react";

import { useState } from "react";

interface TranscriptEntry {
  text: string;
  timestamp: string;
}
function Transcription({ videoId }: { videoId: string }) {
  //FIXME:setTranscrip function removed temporaily to allow the build to pass

  const [transcript] = useState<{
    transcript: TranscriptEntry[];
    cache: string;
  } | null>(null);

  const { featureUsageExceeded } = useSchematicEntitlement(
    FeatureFlag.TRANSCRIPTION
  );
  //FIXME:Temporary console.log to use above variables to proceed with the build without eslint ewrrors
  console.log(videoId);

  return (
    //BUG: The followiing div for Transcription doen't render correctly in a box. No border present. Fix in next build.
    <div className="border p-4 pb-0 rounded-xl gap-4 flex flex-col">
      <Usage title="Transcription" featureFlag={FeatureFlag.TRANSCRIPTION} />
      {/* Transcription */}
      {!featureUsageExceeded ? (
        <div className="border flex flex-col gap-2 max-h-[250px] overflow-y-auto rounded-md p-4 ">
          {transcript ? (
            transcript.transcript.map((entry, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-sm text-gray-400 min-w-[50px]">
                  {entry.timestamp}
                </span>
                <p className="text-sm text-gray-700">{entry.text}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No transcript available</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Transcription;
