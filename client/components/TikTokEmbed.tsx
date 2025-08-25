import React, { useEffect, useRef, useState } from "react";

interface TikTokEmbedProps {
  embedCode: string;
}

export default function TikTokEmbed({ embedCode }: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let renderTimer: NodeJS.Timeout;
    let checkTimer: NodeJS.Timeout;

    const safeRenderTikTok = () => {
      try {
        const windowObj = window as any;

        // Comprehensive safety checks
        if (
          !windowObj.tiktokEmbed ||
          !windowObj.tiktokEmbed.lib ||
          typeof windowObj.tiktokEmbed.lib.render !== "function"
        ) {
          console.log("TikTokEmbed: Library not ready");
          return false;
        }

        // Check if the container has content to render
        if (
          !containerRef.current ||
          !containerRef.current.querySelector(".tiktok-embed")
        ) {
          console.log("TikTokEmbed: Container or embed element not found");
          return false;
        }

        // Additional validation for data-video-id
        const embedElement =
          containerRef.current.querySelector(".tiktok-embed");
        if (!embedElement || !embedElement.hasAttribute("data-video-id")) {
          console.log("TikTokEmbed: Embed element missing or no video ID");
          return false;
        }

        // Enhanced protection: wrap the render call with comprehensive error handling
        const renderWithProtection = () => {
          try {
            // Double-check that the library is still available
            if (!windowObj.tiktokEmbed?.lib?.render) {
              return false;
            }

            // Call the render function with additional safety
            windowObj.tiktokEmbed.lib.render();
            return true;
          } catch (renderError) {
            console.warn("TikTok embed render call failed:", renderError);
            return false;
          }
        };

        const renderSuccess = renderWithProtection();

        if (renderSuccess) {
          setIsLoaded(true);
          setHasError(false);
          console.log("TikTok embed rendered successfully");
        } else {
          setHasError(true);
        }

        return true;
      } catch (error) {
        console.warn("TikTok embed render failed:", error?.message || error);
        setHasError(true);
        return false;
      }
    };

    // Initial render attempt
    renderTimer = setTimeout(() => {
      if (!safeRenderTikTok()) {
        // Retry once after additional delay
        checkTimer = setTimeout(() => {
          if (!safeRenderTikTok()) {
            console.warn("TikTok embed failed to load after retries");
            setHasError(true);
          }
        }, 2000);
      }
    }, 1500);

    return () => {
      clearTimeout(renderTimer);
      clearTimeout(checkTimer);
    };
  }, [embedCode]);

  // Fallback content for when TikTok embeds fail
  if (hasError && !isLoaded) {
    return (
      <div className="tiktok-embed-container w-full max-w-[605px] min-w-[325px] mx-auto bg-gray-100 rounded-lg p-8 text-center">
        <div className="text-gray-600">
          <svg
            className="w-12 h-12 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm font-medium mb-2">
            Video temporarily unavailable
          </p>
          <a
            href="https://tiktok.com/@nut.cravings"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-700 text-sm font-medium underline"
          >
            Visit our TikTok page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="tiktok-embed-container w-full max-w-[605px] min-w-[325px] mx-auto"
      dangerouslySetInnerHTML={{ __html: embedCode }}
    />
  );
}
