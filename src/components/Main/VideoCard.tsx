import Image from "next/image";
import React from "react";

export default function VideoCard({ info }: any) {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  const formatViewCount = (views: string) => {
    const count = parseInt(views);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="mt-2w-64 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="relative">
        <Image
          alt={`${title} image`}
          className="w-full h-36 object-cover rounded-t-lg"
          src={thumbnails.high.url}
          width={256}
          height={144}
        />
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
          10:30
        </div>
      </div>

      <div className="p-3">
        <div className="flex gap-3">
          {/* Channel Avatar */}
          <div className="flex-shrink-0 w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center text-xs font-semibold">
            {channelTitle.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
              {title}
            </h3>
            <p className="text-xs text-gray-600 mt-1">{channelTitle}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              <span>{formatViewCount(statistics.viewCount)} views</span>
              <span>•</span>
              <span>2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
