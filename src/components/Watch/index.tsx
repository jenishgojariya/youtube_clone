"use client";

import React, { useEffect, useState } from "react";
import { Comments, LiveChat } from "@/components";
import { closeMenu, toggleMenu } from "@/lib/features/appSlice";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

type VideoMeta = {
  title: string;
  author_name: string;
  author_url: string;
  thumbnail_url: string;
};

export default function WatchClient() {
  const dispatch = useDispatch();
  const videoId = useSearchParams().get("v");
  const [meta, setMeta] = useState<VideoMeta | null>(null);

  useEffect(() => {
    dispatch(closeMenu());
    return () => {
      dispatch(toggleMenu());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!videoId) return;

    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

    fetch(oembedUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch video metadata");
        return res.json();
      })
      .then((data) => {
        setMeta({
          title: data.title,
          author_name: data.author_name,
          author_url: data.author_url,
          thumbnail_url: data.thumbnail_url,
        });
      })
      .catch((err) => console.error("Error fetching video metadata:", err));
  }, [videoId]);

  if (!videoId) {
    return <div className="p-6">No video selected.</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="px-5 flex w-full">
        <div>
          <iframe
            width="800"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={meta?.title ?? "YouTube video player"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          {meta && (
            <div className="mt-4">
              <h1 className="text-2xl font-bold">{meta.title}</h1>
              <a
                href={meta.author_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {meta.author_name}
              </a>
            </div>
          )}
        </div>

        <div className="w-full">
          <LiveChat />
        </div>
      </div>

      <Comments />
    </div>
  );
}
