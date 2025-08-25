import React, { useState } from "react";
import { Play, ExternalLink } from "lucide-react";

interface TikTokVideoProps {
  videoId: string;
  url: string;
  title: string;
  description: string;
}

export default function TikTokVideo({
  videoId,
  url,
  title,
  description,
}: TikTokVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    setIsLoaded(true);
  };

  const handleVisitTikTok = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20 group hover:scale-105 transition-all duration-300">
      <div className="aspect-[9/16] relative">
        {!isPlaying ? (
          // Thumbnail/Preview State
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex flex-col items-center justify-center p-6">
            {/* Play Button */}
            <button
              onClick={handlePlay}
              className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-6 hover:bg-white hover:scale-110 transition-all duration-300 shadow-2xl"
            >
              <Play className="w-10 h-10 text-black ml-1" />
            </button>

            {/* Video Info */}
            <div className="text-center text-white space-y-3">
              <h3 className="text-lg font-bold leading-tight">{title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {description}
              </p>
              <div className="flex items-center justify-center gap-2 text-white/60 text-xs">
                <span>@nut.cravings</span>
                <span>•</span>
                <span>TikTok</span>
              </div>
            </div>

            {/* Watch on TikTok Button */}
            <button
              onClick={handleVisitTikTok}
              className="mt-6 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              Watch on TikTok
            </button>
          </div>
        ) : (
          // Playing State - TikTok Embed
          <div className="absolute inset-0">
            {isLoaded && (
              <iframe
                src={`https://www.tiktok.com/embed/v2/${videoId}?lang=en-US&autoplay=1`}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                title={`TikTok video ${videoId}`}
                onLoad={() => setIsLoaded(true)}
              />
            )}

            {/* Loading state */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-sm">Loading video...</p>
                </div>
              </div>
            )}

            {/* Close/Back Button */}
            <button
              onClick={() => {
                setIsPlaying(false);
                setIsLoaded(false);
              }}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-200"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Bottom gradient overlay for better text readability */}
      {!isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
