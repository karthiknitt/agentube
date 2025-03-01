"use client";
import { useState, useEffect } from "react";
import { VideoDetails } from "../../types/VideoDetails";
import getVideoDetails from "@/actions/getVideoDetails";
import Image from "next/image";
import { Calendar, Eye, MessageCircle, ThumbsUp } from "lucide-react";

function YoutubeVideoDetails({ videoId }: { videoId: string }) {
  const [video, setVideo] = useState<VideoDetails | null>(null);
  useEffect(() => {
    const fetchVideoDetails = async () => {
      const video = await getVideoDetails(videoId);

      setVideo(video);
    };
    fetchVideoDetails();
  }, [videoId]);
  if (!video)
    return (
      <div className="flex justify-center items-center p-4">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin "></div>
      </div>
    );
  console.log(video);
  return (
    <div className="bg-white rounded-xl @container ">
      <div className="flex flex-col  gap-8">
        {/* Video Thumbnail */}
        <div className="flex-shrink-0 ">
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={500}
            height={500}
            className="w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </div>
        {/* Video Details */}
        <div className="flex-grow space-y-4">
          <h1 className="text-2xl @lg:text-3xl font-bold leading-tight line-clamp-2 text-gray-900">
            {video.title}
          </h1>

          {/* Channel Info */}
          <div className="flex items-center gap-4">
            <Image
              src={video.channel.thumbnail}
              alt={video.channel.title}
              width={48}
              height={48}
              className="w-10 h-10 @md:w-12 rounded-full border-2 border-gray-100"
            />
            <div>
              <p className="text-base @md:text-lg font-semibold text-gray-900">
                {video.channel.title}
              </p>
              <p className="text-sm @md:text-base text-gray-600">
                {video.channel.subscribers} Subscribers
              </p>
            </div>
          </div>

          {/* Video Stats */}
          <div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 pt-4">
            <div className="bg-gray-50 rounded-lg pt-3 transition-all duration-300 hover:bg-gray-100">
              <div>
                <Calendar className="flex items-center gap-2 mb-1" />
                <p className="text-sm text-gray-600">Published</p>
              </div>
              <p className="font-medium text-gray-900">
                {new Date(video.publishedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg pt-3 transition-all duration-300 hover:bg-gray-100">
              <div>
                <Eye className="flex items-center gap-2 mb-1" />
                <p className="text-sm text-gray-600">Views</p>
              </div>
              <p className="font-medium text-gray-900">{video.views}</p>
            </div>

            <div className="bg-gray-50 rounded-lg pt-3 transition-all duration-300 hover:bg-gray-100">
              <div>
                <ThumbsUp className="flex items-center gap-2 mb-1" />
                <p className="text-sm text-gray-600">Likes</p>
              </div>
              <p className="font-medium text-gray-900">{video.likes}</p>
            </div>

            <div className="bg-gray-50 rounded-lg pt-3 transition-all duration-300 hover:bg-gray-100">
              <div>
                <MessageCircle className="flex items-center gap-2 mb-1" />
                <p className="text-sm text-gray-600">Comments</p>
              </div>
              <p className="font-medium text-gray-900">{video.comments}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default YoutubeVideoDetails;
