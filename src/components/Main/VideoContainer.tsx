import React, { useEffect, useState, useRef, useCallback } from "react";
import VideoCard from "./VideoCard";
import { YOUTUBE_VIDEOS_API } from "@/constants/api";
import Link from "next/link";

export default function VideoContainer() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastVideoRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreVideos();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const getVideos = async (pageToken?: string) => {
    setLoading(true);

    const apiUrl = pageToken
      ? `${YOUTUBE_VIDEOS_API}&pageToken=${pageToken}`
      : YOUTUBE_VIDEOS_API;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (pageToken) {
        setVideos((prev) => [...prev, ...data.items]);
      } else {
        setVideos(data.items);
      }

      setNextPageToken(data.nextPageToken || null);
      setHasMore(!!data.nextPageToken);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreVideos = () => {
    if (nextPageToken && !loading) {
      getVideos(nextPageToken);
    }
  };

  useEffect(() => {
    getVideos();

    return () => observer.current?.disconnect();
  }, []);

  return (
    <div className="pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
        {videos.map((video, index) => {
          const isLast = index === videos.length - 1;
          const videoCard = (
            <Link href={"watch?v=" + video.id} key={video.id}>
              <VideoCard info={video} />
            </Link>
          );

          return isLast ? (
            <div ref={lastVideoRef} key={video.id}>
              {videoCard}
            </div>
          ) : (
            videoCard
          );
        })}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!hasMore && videos.length > 0 && (
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-500 text-lg">No more videos to load</p>
        </div>
      )}
    </div>
  );
}
