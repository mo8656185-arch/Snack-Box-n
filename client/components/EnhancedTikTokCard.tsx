import { useState, useEffect, useRef } from "react";
import { Play, X } from "lucide-react";

interface EnhancedTikTokCardProps {
  videoId: string;
  cite: string;
  thumbnailUrl: string;
  title: string;
}

export default function EnhancedTikTokCard({
  videoId,
  cite,
  thumbnailUrl,
  title,
}: EnhancedTikTokCardProps) {
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showReturnNotice, setShowReturnNotice] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoTimeoutRef = useRef<NodeJS.Timeout>();
  const noticeTimeoutRef = useRef<NodeJS.Timeout>();

  const togglePlay = () => {
    setHasStartedPlaying(true);

    // Show return notice after 75 seconds (most TikTok videos are 15-60 seconds)
    noticeTimeoutRef.current = setTimeout(() => {
      setShowReturnNotice(true);
    }, 75000);

    // Auto-return to thumbnail after extended time to ensure full playback
    videoTimeoutRef.current = setTimeout(() => {
      returnToThumbnail();
    }, 90000); // 90 seconds - generous time for any TikTok video
  };

  const returnToThumbnail = () => {
    setHasStartedPlaying(false);
    setShowReturnNotice(false);
    if (videoTimeoutRef.current) {
      clearTimeout(videoTimeoutRef.current);
    }
    if (noticeTimeoutRef.current) {
      clearTimeout(noticeTimeoutRef.current);
    }
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (videoTimeoutRef.current) {
        clearTimeout(videoTimeoutRef.current);
      }
      if (noticeTimeoutRef.current) {
        clearTimeout(noticeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Blurred Background Layer */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px) brightness(0.3)",
          transform: "scale(1.1)",
        }}
      />

      {/* Content Layer */}
      <div
        className="relative aspect-[9/16] bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20"
        style={{
          isolation: "isolate", // Prevent iframe from affecting surrounding elements
        }}
      >
        {!hasStartedPlaying ? (
          /* Thumbnail View */
          <>
            {/* Video Thumbnail */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${thumbnailUrl})` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

            {/* Large Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white hover:bg-white hover:scale-110 transition-all duration-300 shadow-2xl"
              >
                <Play className="w-8 h-8 text-gray-800 ml-1" />
              </button>
            </div>
          </>
        ) : (
          /* Video Playing View - Replace with actual TikTok embed */
          <>
            {/* TikTok Embed Iframe */}
            <iframe
              ref={iframeRef}
              src={`https://www.tiktok.com/embed/v2/${videoId}?lang=en-US&autoplay=1`}
              className="absolute inset-0 w-full h-full border-0 rounded-2xl"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title={`TikTok video ${videoId}`}
              style={{
                background: "black",
              }}
            />

            {/* Close button to return to thumbnail */}
            <button
              onClick={returnToThumbnail}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-black/80 transition-all duration-200"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Loading indicator */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none opacity-0 animate-pulse">
              <div className="text-white text-center p-4">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm">Loading...</p>
              </div>
            </div>

            {/* Return notice - minimal and non-intrusive */}
            {showReturnNotice && (
              <div className="absolute bottom-16 right-4 bg-black/60 backdrop-blur-md rounded-lg p-2 border border-white/20 animate-fade-in">
                <button
                  onClick={returnToThumbnail}
                  className="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded text-xs transition-all duration-200"
                >
                  Back to thumbnail
                </button>
              </div>
            )}

            {/* Video info overlay - minimal */}
            <div className="absolute bottom-4 left-4 right-16">
              <p className="text-white/80 text-xs">
                @nut.cravings • Tap ✕ to close
              </p>
            </div>
          </>
        )}

        {/* Bottom Content - Only show when not playing actual video */}
        {!hasStartedPlaying && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Video Info */}
            <div className="mb-3">
              <p className="text-white font-medium text-sm mb-1">
                @nut.cravings
              </p>
              <p className="text-white/80 text-xs line-clamp-2">{title}</p>
            </div>

            {/* Action Button */}
            <a
              href={cite}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-4 rounded-lg font-medium text-sm text-center hover:from-pink-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
              Watch on TikTok
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
