import { useState, useEffect, useRef } from "react";
import { useAdminData, useSEOData } from "@/hooks/useAdminData";
import {
  X,
  Truck,
  ShoppingCart,
  Package,
  Gift,
  Users,
  Sparkles,
  Zap,
  CheckCircle,
  ChevronDown,
  ExternalLink,
  Play,
  Maximize2,
  Eye,
  Star,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import AutoScrollCarousel from "../components/AutoScrollCarousel";
import ErrorBoundary from "../components/ErrorBoundary";

// Helper function to calculate pricing
const calculatePricing = (salePrice: string) => {
  const salePriceNumeric = parseFloat(salePrice.replace("$", ""));
  // Following the formula: regularPrice = salePrice / 0.3 (since salePrice = regularPrice * 0.3)
  const regularPriceCalculated = salePriceNumeric / 0.3;

  // Round up to .99 - get the integer part and add .99
  const regularPriceRounded = Math.floor(regularPriceCalculated) + 0.99;

  return {
    salePrice: salePrice,
    regularPrice: `$${regularPriceRounded.toFixed(2)}`,
  };
};

// Helper function to get icon component by name
const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: any } = {
    CheckCircle,
    Package,
    Gift,
    Users,
    Sparkles,
    Zap,
    ShoppingCart,
    Truck,
    Star,
    ExternalLink,
    Play,
    Maximize2,
    Eye,
  };
  return icons[iconName] || CheckCircle;
};

// Star Rating Component
const StarRating = ({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount?: number;
}) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
      {reviewCount && (
        <span className="text-sm text-gray-600 ml-1">({reviewCount})</span>
      )}
    </div>
  );
};

// Static data moved to adminData.ts - now uses dynamic data from localStorage

export default function Index() {
  const { data: adminData, loading } = useAdminData();
  useSEOData(); // Apply SEO meta tags

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activePopup, setActivePopup] = useState<{
    product: any;
    popupData: any;
  } | null>(null);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Shared state for DOM protection across all TikTok initialization functions
  const domProtectionStateRef = useRef({
    isActive: false,
    restoreFunction: null as (() => void) | null,
  });

  // All useEffect hooks must be before early returns
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.3; // Show earlier - after 30% scroll
      setShowFloatingButton(scrolled > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Control body overflow when modal or popup is open
  useEffect(() => {
    if (selectedProduct || activePopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProduct, activePopup]);

  // Enhanced TikTok embed initialization with comprehensive error prevention
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 2; // Reduced retries to avoid excessive requests
    let initializationTimers: NodeJS.Timeout[] = [];

    // Create comprehensive DOM protection that handles all possible undefined access patterns
    const createDOMProtection = () => {
      if (domProtectionStateRef.current.isActive) {
        return domProtectionStateRef.current.restoreFunction || (() => {});
      }
      domProtectionStateRef.current.isActive = true;

      // Store all original methods
      const original = {
        querySelectorAll: document.querySelectorAll,
        getElementsByClassName: document.getElementsByClassName,
        getElementsByTagName: document.getElementsByTagName,
        getElementById: document.getElementById,
        querySelector: document.querySelector,
      };

      // Enhanced querySelectorAll with null checks and empty array fallback
      document.querySelectorAll = function (selector) {
        try {
          if (!selector || typeof selector !== "string") return [];
          const result = original.querySelectorAll.call(document, selector);
          // Ensure result has length property and is iterable
          if (!result || typeof result.length !== "number") {
            return [];
          }
          // Convert NodeList to Array to prevent prototype issues
          return Array.from(result);
        } catch (e) {
          console.warn("Protected querySelectorAll caught error:", e);
          return [];
        }
      };

      // Enhanced getElementsByClassName
      document.getElementsByClassName = function (className) {
        try {
          if (!className || typeof className !== "string") return [];
          const result = original.getElementsByClassName.call(
            document,
            className,
          );
          if (!result || typeof result.length !== "number") {
            return [];
          }
          return Array.from(result);
        } catch (e) {
          console.warn("Protected getElementsByClassName caught error:", e);
          return [];
        }
      };

      // Enhanced getElementsByTagName
      document.getElementsByTagName = function (tagName) {
        try {
          if (!tagName || typeof tagName !== "string") return [];
          const result = original.getElementsByTagName.call(document, tagName);
          if (!result || typeof result.length !== "number") {
            return [];
          }
          return Array.from(result);
        } catch (e) {
          console.warn("Protected getElementsByTagName caught error:", e);
          return [];
        }
      };

      // Enhanced querySelector
      document.querySelector = function (selector) {
        try {
          if (!selector || typeof selector !== "string") return null;
          return original.querySelector.call(document, selector);
        } catch (e) {
          console.warn("Protected querySelector caught error:", e);
          return null;
        }
      };

      // Enhanced getElementById
      document.getElementById = function (id) {
        try {
          if (!id || typeof id !== "string") return null;
          return original.getElementById.call(document, id);
        } catch (e) {
          console.warn("Protected getElementById caught error:", e);
          return null;
        }
      };

      // Add protection to Element.prototype methods if they exist
      if (typeof Element !== "undefined" && Element.prototype) {
        const originalMatches = Element.prototype.matches;
        if (originalMatches) {
          Element.prototype.matches = function (selector) {
            try {
              return originalMatches.call(this, selector);
            } catch (e) {
              console.warn("Protected Element.matches caught error:", e);
              return false;
            }
          };
        }
      }

      // Return restoration function
      const restoreFunction = () => {
        domProtectionStateRef.current.isActive = false;
        domProtectionStateRef.current.restoreFunction = null;
        document.querySelectorAll = original.querySelectorAll;
        document.getElementsByClassName = original.getElementsByClassName;
        document.getElementsByTagName = original.getElementsByTagName;
        document.getElementById = original.getElementById;
        document.querySelector = original.querySelector;
      };

      domProtectionStateRef.current.restoreFunction = restoreFunction;
      return restoreFunction;
    };

    const loadTikTokScript = () => {
      return new Promise<void>((resolve, reject) => {
        // Check if script already exists
        const existingScript = document.querySelector(
          'script[src*="tiktok.com/embed.js"]',
        );
        if (existingScript) {
          resolve();
          return;
        }

        // Apply comprehensive DOM protection before loading script
        const restoreDOM = createDOMProtection();

        // Create new script without cache-busting to avoid repeated failures
        const script = document.createElement("script");
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        script.defer = true;

        // Set up timeout to prevent hanging
        const timeoutId = setTimeout(() => {
          console.warn("TikTok script loading timed out");
          reject(new Error("TikTok script timeout"));
        }, 10000); // 10 second timeout

        script.onload = () => {
          clearTimeout(timeoutId);
          // Mark the load time for readiness checks
          script.dataset.loadedAt = Date.now().toString();
          // Keep DOM protection active for longer to handle all TikTok initialization
          setTimeout(() => {
            console.log("TikTok script loaded, keeping DOM protection active");
          }, 1000);
          resolve();
        };

        script.onerror = () => {
          clearTimeout(timeoutId);
          restoreDOM(); // Restore on error
          console.warn(
            "TikTok embed script failed to load - continuing without embeds",
          );
          reject(new Error("Failed to load TikTok script"));
        };

        // Append to head for better compatibility
        document.head.appendChild(script);
      });
    };

    const safeRenderTikTok = () => {
      try {
        // Enhanced safety checks with proper error handling
        const windowObj = window as any;

        // Check if TikTok embed object exists with all required properties
        if (!windowObj.tiktokEmbed) {
          console.log("TikTok embed object not found");
          return false;
        }

        const { tiktokEmbed } = windowObj;

        // Verify lib object exists
        if (!tiktokEmbed.lib || typeof tiktokEmbed.lib !== "object") {
          console.log("TikTok embed library not ready");
          return false;
        }

        // Verify render function exists and is callable
        if (typeof tiktokEmbed.lib.render !== "function") {
          console.log("TikTok embed render function not available");
          return false;
        }

        // Additional readiness check: verify the embed script is fully initialized
        if (
          tiktokEmbed.lib._initialized === false ||
          (tiktokEmbed.lib.hasOwnProperty("_ready") && !tiktokEmbed.lib._ready)
        ) {
          console.log("TikTok embed library not fully initialized");
          return false;
        }

        // Ensure DOM protection is active before checking for embeds
        if (!domProtectionStateRef.current.isActive) {
          createDOMProtection();
        }

        // Check if there are any embeds to render with enhanced validation
        const embedContainers = document.querySelectorAll(
          ".tiktok-embed-container",
        );

        // Verify the result is properly structured
        if (
          !embedContainers ||
          typeof embedContainers.length !== "number" ||
          embedContainers.length === 0
        ) {
          return false;
        }

        // Additional safety check: verify that embed containers have valid content
        let validEmbedCount = 0;
        for (let i = 0; i < embedContainers.length; i++) {
          try {
            const container = embedContainers[i];
            if (container && typeof container.querySelector === "function") {
              const embedElement = container.querySelector(".tiktok-embed");
              if (
                embedElement &&
                typeof embedElement.hasAttribute === "function" &&
                embedElement.hasAttribute("data-video-id")
              ) {
                validEmbedCount++;
              }
            }
          } catch (e) {
            console.warn("Error validating embed container:", e);
          }
        }

        if (validEmbedCount === 0) {
          return false;
        }

        // Add defensive wrapper to prevent undefined length errors
        const originalQuerySelectorAll = document.querySelectorAll;
        document.querySelectorAll = function (selector) {
          try {
            const result = originalQuerySelectorAll.call(document, selector);
            return result || [];
          } catch (e) {
            return [];
          }
        };

        // Add similar protection for getElementsByClassName
        const originalGetElementsByClassName = document.getElementsByClassName;
        document.getElementsByClassName = function (className) {
          try {
            const result = originalGetElementsByClassName.call(
              document,
              className,
            );
            return result || [];
          } catch (e) {
            return [];
          }
        };

        // Additional protection: wrap the render call with comprehensive error handling
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
            console.warn("TikTok render call failed:", renderError);
            return false;
          }
        };

        const renderSuccess = renderWithProtection();

        if (renderSuccess) {
          console.log("TikTok embeds rendered successfully with protection");
        }

        return renderSuccess;
      } catch (error) {
        console.warn("TikTok render attempt failed safely:", error);
        return false;
      }
    };

    const initializeTikTokEmbeds = async () => {
      try {
        // Wait for script to load with timeout
        await loadTikTokScript();

        // Wait for TikTok embed library to initialize
        const timer1 = setTimeout(() => {
          if (safeRenderTikTok()) {
            console.log("TikTok embeds rendered successfully");
            return;
          }

          // Retry once after additional delay
          if (retryCount < maxRetries) {
            retryCount++;
            const timer2 = setTimeout(() => {
              if (safeRenderTikTok()) {
                console.log("TikTok embeds rendered on retry");
              } else {
                console.warn(
                  "TikTok embeds failed to initialize - videos may not display",
                );
              }
            }, 3000);
            initializationTimers.push(timer2);
          }
        }, 2000);

        initializationTimers.push(timer1);
      } catch (error) {
        console.warn("TikTok embeds unavailable:", error?.message || error);
        // Gracefully continue without TikTok embeds
      }
    };

    // Start initialization after component mounts
    const mainTimer = setTimeout(initializeTikTokEmbeds, 1000);
    initializationTimers.push(mainTimer);

    return () => {
      // Clear all timers to prevent memory leaks
      initializationTimers.forEach((timer) => clearTimeout(timer));

      // Restore DOM methods if protection is still active
      if (
        domProtectionStateRef.current.isActive &&
        domProtectionStateRef.current.restoreFunction
      ) {
        try {
          domProtectionStateRef.current.restoreFunction();
        } catch (e) {
          console.warn("Error restoring DOM methods on cleanup:", e);
        }
      }

      // Don't remove script on unmount to avoid repeated loading attempts
      // The script will persist for the session
    };
  }, []);

  // Enhanced TikTok section visibility handling with error protection
  useEffect(() => {
    const tiktokSection = document.querySelector(".tiktok-section");
    if (!tiktokSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Wait longer for TikTok script to be fully ready, then try to reinitialize
            const reinitializeTimer = setTimeout(() => {
              try {
                const windowObj = window as any;

                // Enhanced readiness checks
                if (
                  !windowObj.tiktokEmbed ||
                  !windowObj.tiktokEmbed.lib ||
                  typeof windowObj.tiktokEmbed.lib.render !== "function"
                ) {
                  console.log("TikTok embed not ready for reinitialization");
                  return;
                }

                // Additional check: ensure embed script has been running for sufficient time
                const tiktokScript = document.querySelector(
                  'script[src*="tiktok.com/embed.js"]',
                );
                if (!tiktokScript || !tiktokScript.dataset.loadedAt) {
                  console.log("TikTok embed script not fully loaded");
                  return;
                }

                const loadedAt = parseInt(tiktokScript.dataset.loadedAt);
                const timeSinceLoad = Date.now() - loadedAt;
                if (timeSinceLoad < 3000) {
                  // Ensure at least 3 seconds have passed
                  console.log(
                    "TikTok embed script needs more time to initialize",
                  );
                  return;
                }

                // Check if there are embed containers to render
                const embedContainers = document.querySelectorAll(
                  ".tiktok-embed-container",
                );
                if (embedContainers.length === 0) {
                  return;
                }

                // Additional validation: ensure containers have valid TikTok embed content
                const validContainers = Array.from(embedContainers).filter(
                  (container) => {
                    const embedElement =
                      container.querySelector(".tiktok-embed");
                    return (
                      embedElement && embedElement.hasAttribute("data-video-id")
                    );
                  },
                );

                if (validContainers.length === 0) {
                  return;
                }

                // Ensure DOM protection is active for reinitialization
                if (!domProtectionStateRef.current.isActive) {
                  const createDOMProtection = () => {
                    if (domProtectionStateRef.current.isActive) {
                      return (
                        domProtectionStateRef.current.restoreFunction ||
                        (() => {})
                      );
                    }
                    // Simplified protection for reinitialization
                    return () => {};
                  };
                  createDOMProtection();
                }

                // Use the same safe render function for consistency
                const safeRenderTikTok = () => {
                  try {
                    const windowObj = window as any;
                    if (!windowObj.tiktokEmbed?.lib?.render) {
                      return false;
                    }
                    windowObj.tiktokEmbed.lib.render();
                    return true;
                  } catch (error) {
                    console.warn("TikTok render failed safely:", error);
                    return false;
                  }
                };

                const reinitSuccess = safeRenderTikTok();

                if (reinitSuccess) {
                  console.log("TikTok embeds reinitialized on scroll");
                } else {
                  console.warn(
                    "TikTok embeds failed to reinitialize on scroll",
                  );
                }
              } catch (error) {
                console.warn(
                  "TikTok reinitialize failed safely:",
                  error?.message || error,
                );
                // Continue gracefully without throwing
              }
            }, 2000); // Increased delay to ensure TikTok script is fully ready

            // Store timer reference for cleanup
            entry.target.setAttribute(
              "data-reinit-timer",
              reinitializeTimer.toString(),
            );
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(tiktokSection);

    return () => {
      observer.disconnect();
      // Clear any pending reinitialize timers
      const timerAttr = tiktokSection.getAttribute("data-reinit-timer");
      if (timerAttr) {
        clearTimeout(parseInt(timerAttr));
      }
    };
  }, []);

  // Show loading state while data loads
  if (loading || !adminData) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-logo-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const {
    hero,
    carousel,
    features,
    products,
    testimonials,
    tiktok,
    cta,
    footer,
    popups,
  } = adminData;

  const scrollToProducts = () => {
    document
      .getElementById("products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const openFirstProductModal = () => {
    setSelectedProduct(products[0]);
  };

  // Get popup data for a product based on its size
  const getProductPopup = (product: any) => {
    const sizeNumber = parseInt(product.size.replace(" ct", ""));
    return adminData?.popups?.[sizeNumber as keyof typeof adminData.popups];
  };

  // Handle product card click - show popup first
  const handleProductClick = (product: any) => {
    const popupData = getProductPopup(product);
    if (popupData) {
      setActivePopup({ product, popupData });
    } else {
      // Fallback to direct modal if no popup configured
      setSelectedProduct(product);
    }
  };

  // Open full product modal from popup
  const openFullProductModal = (product: any) => {
    setActivePopup(null);
    setSelectedProduct(product);
  };

  // Swipe to close functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isDownSwipe = distance < -100; // Swipe down by more than 100px

    if (isDownSwipe) {
      setSelectedProduct(null);
    }
  };

  // TikTok useEffect hooks moved to top of component to fix hooks order

  return (
    <div className="min-h-screen bg-blue-50">
      {/* JSON-LD Schema Markup for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Gift A Snack",
          url: "https://www.giftasnack.com",
          logo: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2Fcd932fcd18414ba798762d622c2b825c?format=webp&width=400",
          description:
            "Premium snack box company offering variety packs perfect for gifts and care packages",
          sameAs: ["https://www.tiktok.com/@nut.cravings"],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            areaServed: "US",
          },
        })}
      </script>

      {/* JSON-LD Schema Markup for Product Collection */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "ItemList",
          name: "Gift A Snack Premium Snack Box Collection",
          description:
            "Premium snack boxes with variety packs featuring chips, crackers, cookies, and candy",
          itemListElement: products.map((product, index) => {
            const pricing = calculatePricing(product.price);
            return {
              "@type": "Product",
              position: index + 1,
              name: product.name,
              description: product.description,
              image: product.image,
              url: `https://www.giftasnack.com/#product-${product.id}`,
              sku: `product-${product.id}`,
              brand: {
                "@type": "Brand",
                name: "Gift A Snack",
              },
              offers: {
                "@type": "Offer",
                url: product.walmartLink,
                priceCurrency: "USD",
                price: pricing.salePrice.replace("$", ""),
                availability: "https://schema.org/InStock",
                seller: {
                  "@type": "Organization",
                  name: "Walmart",
                },
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.reviewCount,
              },
            };
          }),
        })}
      </script>
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden py-4 px-4 sm:py-8 min-h-[50vh] flex items-center">
        {/* Advanced Geometric Background */}
        <div className="absolute inset-0">
          {/* Primary gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-50"></div>
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-logo-green/20 to-green-400/20 rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-orange-300/20 to-red-300/20 rounded-full blur-lg"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full blur-lg"></div>
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left fade-in">
              {/* Logo with enhanced frame */}
              <div className="flex justify-center lg:justify-start mb-4 sm:mb-6">
                <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-5 rounded-2xl shadow-xl border border-gray-200/50 inline-block">
                  <img
                    src={hero.logo}
                    alt="Gift A Snack Premium Snack Box Company Logo - Quality Snack Boxes for Gifts"
                    className="h-16 sm:h-20 lg:h-28 w-auto"
                    loading="eager"
                    width="200"
                    height="112"
                  />
                </div>
              </div>

              {hero.badge.text && (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-logo-green/15 to-green-400/15 backdrop-blur-sm text-logo-green px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-logo-green/20">
                  {(() => {
                    const IconComponent = getIconComponent(hero.badge.icon);
                    return <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />;
                  })()}
                  <span className="hidden sm:inline">{hero.badge.text}</span>
                  <span className="sm:hidden">
                    {hero.badge.text.split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-heading-red mb-4 sm:mb-6 leading-tight tracking-tight">
                <span className="block">{hero.title.line1}</span>
                <span className="block text-snack-dark-blue">
                  {hero.title.line2}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-snack-dark-blue/80 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                <span className="hidden sm:inline">
                  {hero.description.desktop}
                </span>
                <span className="sm:hidden">{hero.description.mobile}</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8">
                {hero.buttons.primary.text && (
                  <button
                    onClick={() => {
                      if (hero.buttons.primary.action === "scrollToProducts") {
                        scrollToProducts();
                      } else if (
                        hero.buttons.primary.action.startsWith("scroll")
                      ) {
                        const elementId =
                          hero.buttons.primary.action
                            .replace("scrollTo", "")
                            .toLowerCase() + "-section";
                        document
                          .getElementById(elementId)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="group relative bg-gradient-to-r from-logo-green to-green-500 hover:from-green-500 hover:to-emerald-500 text-white font-black px-8 sm:px-10 py-5 sm:py-6 rounded-2xl text-lg sm:text-xl transition-all duration-300 flex items-center justify-center gap-3 min-h-[64px] sm:min-h-[72px] touch-manipulation tap-highlight-none focus-visible-ring shadow-xl hover:shadow-2xl transform hover:scale-105 overflow-hidden"
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(155, 217, 91, 0.4))",
                    }}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-logo-green/50 to-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                    <Package className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">
                      {hero.buttons.primary.text}
                    </span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                )}
                {hero.buttons.secondary.text && (
                  <button
                    onClick={() => {
                      if (
                        hero.buttons.secondary.action === "scrollToFeatures"
                      ) {
                        document
                          .getElementById("why-choose-section")
                          ?.scrollIntoView({ behavior: "smooth" });
                      } else if (
                        hero.buttons.secondary.action.startsWith("scroll")
                      ) {
                        const elementId =
                          hero.buttons.secondary.action
                            .replace("scrollTo", "")
                            .toLowerCase() + "-section";
                        document
                          .getElementById(elementId)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="border-2 border-logo-green text-logo-green hover:bg-logo-green hover:text-white font-bold px-8 sm:px-10 py-5 sm:py-6 rounded-2xl text-lg sm:text-xl transition-all duration-300 min-h-[64px] sm:min-h-[72px] touch-manipulation tap-highlight-none focus-visible-ring hover:shadow-lg transform hover:scale-105"
                  >
                    {hero.buttons.secondary.text}
                  </button>
                )}
              </div>

              {/* Enhanced Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-sm text-snack-dark-blue/70">
                {hero.trustIndicators.map((indicator, index) => {
                  const IconComponent = getIconComponent(indicator.icon);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full"
                    >
                      <IconComponent className="w-4 h-4 text-logo-green" />
                      <span className="font-medium">{indicator.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Hero Image with 3D Effect */}
            <div className="slide-up relative">
              <div className="relative lg:scale-110 lg:translate-x-8">
                {/* 3D Background frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-logo-green/30 via-green-400/20 to-emerald-400/30 rounded-3xl transform rotate-3 blur-sm"></div>
                <div className="absolute -inset-2 bg-gradient-to-br from-orange-300/20 to-red-300/20 rounded-3xl transform -rotate-2 blur-sm"></div>

                {/* Main image container with overlap effect */}
                <div className="relative bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-2xl border border-white/50">
                  <img
                    src={hero.heroImage}
                    alt="Gift A Snack Premium Snack Box Collection with Chips Crackers Cookies and Candy Variety Packs for Gifts and Care Packages"
                    className="relative z-10 w-full h-auto rounded-2xl transform transition-transform duration-500 hover:scale-105"
                    loading="eager"
                    width="700"
                    height="500"
                    style={{
                      filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.15))",
                    }}
                  />

                  {/* Floating elements for 3D effect */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-sm opacity-80 animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-md opacity-60 animate-pulse delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auto-Scrolling Banner Carousel */}
      <AutoScrollCarousel />

      {/* Enhanced Features & Benefits Section */}
      <section
        id="why-choose-section"
        className="py-8 sm:py-12 px-4 relative overflow-hidden"
      >
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-gray-50"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-br from-logo-green/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-gradient-to-br from-orange-300/20 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-heading-red mb-4 sm:mb-6 tracking-tight">
              {features.title}
            </h2>
            <p className="text-lg text-snack-dark-blue/80 max-w-2xl mx-auto leading-relaxed">
              {features.description}
            </p>
          </div>

          {/* Single Row Layout for All Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {features.items.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon);
              const colors = [
                "from-red-500 to-pink-500",
                "from-blue-500 to-cyan-500",
                "from-green-500 to-emerald-500",
                "from-purple-500 to-violet-500",
                "from-orange-500 to-yellow-500",
              ];

              return (
                <div
                  key={index}
                  className="group text-center transform transition-all duration-700 hover:scale-105 bg-white rounded-2xl p-6 border-2 border-gray-800 shadow-lg hover:shadow-xl"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                  }}
                >
                  {/* Circular Icon Container with Colorful Design */}
                  <div className="relative mb-6">
                    {/* Outer glow ring */}
                    <div
                      className={`absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-br ${colors[index % colors.length]} rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                    ></div>

                    {/* Main circular icon */}
                    <div
                      className={`relative w-24 h-24 mx-auto bg-gradient-to-br ${colors[index % colors.length]} rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:rotate-6`}
                    >
                      <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />

                      {/* Inner highlight */}
                      <div className="absolute inset-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Floating particles effect */}
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse delay-300"></div>
                  </div>

                  {/* Title with enhanced styling */}
                  <h3 className="text-xl lg:text-2xl font-black text-heading-red mb-3 group-hover:text-snack-dark-blue transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description with better typography */}
                  <p className="text-base text-gray-600 leading-relaxed max-w-xs mx-auto group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className={`w-12 h-1 bg-gradient-to-r ${colors[index % colors.length]} mx-auto mt-4 rounded-full opacity-60 group-hover:opacity-100 group-hover:w-16 transition-all duration-300`}
                  ></div>
                </div>
              );
            })}
          </div>

          {/* Additional visual element */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200/50">
              <Sparkles className="w-5 h-5 text-logo-green" />
              <span className="text-sm font-semibold text-gray-700">
                Trusted by thousands of happy customers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Sizes Section */}
      <section
        id="products-section"
        className="py-6 sm:py-12 px-4 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-heading-red mb-2 sm:mb-3 tracking-tight">
              Our Snack Box Collection
            </h2>
            <p className="text-base text-snack-dark-blue/70 max-w-xl mx-auto">
              From small treats to large celebrations, we have the perfect size
              for every occasion
            </p>
          </div>

          {/* Mobile Horizontal Scroll - Modern E-commerce Design */}
          <div className="block sm:hidden">
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-6 w-max">
                {products.map((product, index) => {
                  const pricing = calculatePricing(product.price);
                  const savingsPercent = (
                    ((parseFloat(pricing.regularPrice.replace("$", "")) -
                      parseFloat(pricing.salePrice.replace("$", ""))) /
                      parseFloat(pricing.regularPrice.replace("$", ""))) *
                    100
                  ).toFixed(0);

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 w-[300px] flex-shrink-0 overflow-hidden group hover:scale-[1.03] active:scale-[0.98] relative border-2 border-gray-800"
                    >
                      {/* Full Image Fill with White Background */}
                      <div className="relative h-[320px] overflow-hidden bg-white p-4">
                        <img
                          src={`${product.image}&quality=95&format=webp&width=300`}
                          alt={`Gift A Snack ${product.size} Premium Snack Box with Chips Crackers Cookies and Candy for Gifts and Care Packages`}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl"
                          loading="lazy"
                          decoding="async"
                          width="300"
                          height="320"
                        />

                        {/* Discount Badge - Enhanced */}
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-xl text-sm font-black shadow-xl">
                          -{savingsPercent}%
                        </div>

                        {/* Popular Badge */}
                        {index === 1 && (
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-xl">
                            �� Popular
                          </div>
                        )}

                        {/* Price Strip Overlay at Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 via-white/90 to-transparent p-4 pb-6">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-2xl font-black text-red-600 drop-shadow-lg">
                              {pricing.salePrice}
                            </span>
                            <span className="text-lg text-gray-500 line-through">
                              {pricing.regularPrice}
                            </span>
                          </div>
                          <div className="text-sm font-bold text-green-600">
                            Save $
                            {(
                              parseFloat(
                                pricing.regularPrice.replace("$", ""),
                              ) - parseFloat(pricing.salePrice.replace("$", ""))
                            ).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Compact Content Area */}
                      <div className="p-4 space-y-3">
                        {/* Product Title */}
                        <h3 className="font-bold text-gray-900 leading-tight text-base line-clamp-2 min-h-[40px]">
                          {product.shortName || product.name}
                        </h3>

                        {/* Box Contents Icons & Rating */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">🍪</span>
                            <span className="text-base">��</span>
                            <span className="text-base">🥨</span>
                            <span className="text-xs text-gray-500 ml-1 font-medium">
                              {product.size}
                            </span>
                          </div>

                          {/* Ratings - compact */}
                          {product.rating && (
                            <div className="flex items-center gap-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-600 ml-1">
                                ({product.reviewCount})
                              </span>
                            </div>
                          )}
                        </div>

                        {/* View Details Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product);
                          }}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Quick View
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Scroll indicator */}
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                ← Swipe to see more boxes →
              </span>
            </div>
          </div>

          {/* Desktop/Tablet Grid - Modern E-commerce Design */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => {
              const pricing = calculatePricing(product.price);
              const savingsPercent = (
                ((parseFloat(pricing.regularPrice.replace("$", "")) -
                  parseFloat(pricing.salePrice.replace("$", ""))) /
                  parseFloat(pricing.regularPrice.replace("$", ""))) *
                100
              ).toFixed(0);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:scale-[1.03] cursor-pointer relative border-2 border-gray-800"
                >
                  {/* Full Image Fill with White Background */}
                  <div className="relative h-[240px] lg:h-[280px] overflow-hidden bg-white p-3 lg:p-4">
                    <img
                      src={`${product.image}&quality=95&format=webp&width=320`}
                      alt={`Gift A Snack ${product.size} Premium Snack Box with Chips Crackers Cookies and Candy for Gifts and Care Packages`}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl"
                      loading="lazy"
                      decoding="async"
                      width="320"
                      height="280"
                    />

                    {/* Enhanced Discount Badge */}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-2.5 py-1 rounded-xl text-xs font-black shadow-xl">
                      -{savingsPercent}%
                    </div>

                    {/* Popular Badge */}
                    {index === 1 && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2.5 py-1 rounded-xl text-xs font-bold shadow-xl">
                        🔥 Popular
                      </div>
                    )}

                    {/* Price Strip Overlay at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 via-white/90 to-transparent p-3 lg:p-4 pb-4 lg:pb-5">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xl lg:text-2xl font-black text-red-600 drop-shadow-lg">
                          {pricing.salePrice}
                        </span>
                        <span className="text-sm lg:text-base text-gray-500 line-through">
                          {pricing.regularPrice}
                        </span>
                      </div>
                      <div className="text-xs lg:text-sm font-bold text-green-600">
                        Save $
                        {(
                          parseFloat(pricing.regularPrice.replace("$", "")) -
                          parseFloat(pricing.salePrice.replace("$", ""))
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Content Area - 30% of card area, clean and minimal */}
                  <div className="p-3 lg:p-4 space-y-2 lg:space-y-3">
                    {/* Product Title - Bold, clean typography */}
                    <h3 className="font-bold text-gray-900 leading-tight text-sm lg:text-base line-clamp-2 min-h-[36px] lg:min-h-[40px]">
                      {product.shortName || product.name}
                    </h3>

                    {/* Box Contents Icons - playful visual */}
                    <div className="flex items-center gap-1">
                      <span className="text-sm lg:text-base">�����</span>
                      <span className="text-sm lg:text-base">🍫</span>
                      <span className="text-sm lg:text-base">🥨</span>
                      <span className="text-xs text-gray-500 ml-2 font-medium">
                        {product.size}
                      </span>
                    </div>

                    {/* Ratings - compact */}
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 lg:w-3.5 lg:h-3.5 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">
                          ({product.reviewCount})
                        </span>
                      </div>
                    )}

                    {/* View Details Button - Vibrant, full-width */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2.5 lg:py-3 rounded-xl text-xs lg:text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                      Quick View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />
      {/* TikTok Videos Section */}
      <ErrorBoundary
        fallback={
          <div className="py-12 text-center bg-gray-100">
            <p className="text-gray-600">
              Social media content temporarily unavailable
            </p>
          </div>
        }
      >
        <section
          className="tiktok-section py-6 sm:py-12 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-6 sm:mb-10 relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                Watch Gift A Snack on TikTok
              </h2>
              <p className="text-base text-gray-300 max-w-xl mx-auto">
                See our snack boxes in action and get inspired for your next
                order
              </p>
            </div>

            {/* Call to action for videos */}
            <div className="text-center mb-6 sm:mb-8">
              <a
                href="https://tiktok.com/@nut.cravings"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Play className="w-4 h-4" />
                Follow us on TikTok
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* First TikTok Video */}
              <div
                className="tiktok-embed-container mb-8 lg:mb-0"
                dangerouslySetInnerHTML={{
                  __html: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@nut.cravings/video/7522097145223187725" data-video-id="7522097145223187725" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@nut.cravings" href="https://www.tiktok.com/@nut.cravings?refer=embed">@nut.cravings</a> Gift A Snack - Assorted Healthy Treats, Granola Bars, Chips, Candies &amp; More | Perfect for Gifting &amp; Care Packages <a title="giftasnack" target="_blank" href="https://www.tiktok.com/tag/giftasnack?refer=embed">#GiftASnack</a> <a title="snackbox" target="_blank" href="https://www.tiktok.com/tag/snackbox?refer=embed">#SnackBox</a> <a title="healthytreats" target="_blank" href="https://www.tiktok.com/tag/healthytreats?refer=embed">#HealthyTreats</a> <a title="carepackage" target="_blank" href="https://www.tiktok.com/tag/carepackage?refer=embed">#CarePackage</a> <a title="giftboxideas" target="_blank" href="https://www.tiktok.com/tag/giftboxideas?refer=embed">#GiftBoxIdeas</a> <a title="snacklovers" target="_blank" href="https://www.tiktok.com/tag/snacklovers?refer=embed">#SnackLovers</a> <a title="granolabars" target="_blank" href="https://www.tiktok.com/tag/granolabars?refer=embed">#GranolaBars</a> <a title="chipsandcandy" target="_blank" href="https://www.tiktok.com/tag/chipsandcandy?refer=embed">#ChipsAndCandy</a> <a title="snacktime" target="_blank" href="https://www.tiktok.com/tag/snacktime?refer=embed">#SnackTime</a> <a title="foodgiftbox" target="_blank" href="https://www.tiktok.com/tag/foodgiftbox?refer=embed">#FoodGiftBox</a> <a title="assortedsnacks" target="_blank" href="https://www.tiktok.com/tag/assortedsnacks?refer=embed">#AssortedSnacks</a> <a title="giftingmadeeasy" target="_blank" href="https://www.tiktok.com/tag/giftingmadeeasy?refer=embed">#GiftingMadeEasy</a> <a title="snacksurprise" target="_blank" href="https://www.tiktok.com/tag/snacksurprise?refer=embed">#SnackSurprise</a> <a title="collegecarepackage" target="_blank" href="https://www.tiktok.com/tag/collegecarepackage?refer=embed">#CollegeCarePackage</a> <a title="corporategifts" target="_blank" href="https://www.tiktok.com/tag/corporategifts?refer=embed">#CorporateGifts</a> <a title="snackaddict" target="_blank" href="https://www.tiktok.com/tag/snackaddict?refer=embed">#SnackAddict</a> <a target="_blank" title="��� Product introduction, commercials, information, summer(1284254) - yutaka.T" href="https://www.tiktok.com/music/Product-introduction-commercials-information-summer-1284254-7133249539493857281?refer=embed">♬ Product introduction, commercials, information, summer(1284254) - yutaka.T</a> </section> </blockquote>`,
                }}
              />

              {/* Second TikTok Video */}
              <div
                className="tiktok-embed-container mb-8 lg:mb-0"
                dangerouslySetInnerHTML={{
                  __html: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@nut.cravings/video/7521731881373682958" data-video-id="7521731881373682958" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@nut.cravings" href="https://www.tiktok.com/@nut.cravings?refer=embed">@nut.cravings</a> Gift A Snack - Assorted Healthy Treats, Granola Bars, Chips, Candies &amp; More | Perfect for Gifting &amp; Care Packages <a title="giftasnack" target="_blank" href="https://www.tiktok.com/tag/giftasnack?refer=embed">#GiftASnack</a><a title="snackbox" target="_blank" href="https://www.tiktok.com/tag/snackbox?refer=embed">#SnackBox</a><a title="healthysnacking" target="_blank" href="https://www.tiktok.com/tag/healthysnacking?refer=embed">#HealthySnacking</a><a title="carepackage" target="_blank" href="https://www.tiktok.com/tag/carepackage?refer=embed">#CarePackage</a><a title="snacklovers" target="_blank" href="https://www.tiktok.com/tag/snacklovers?refer=embed">#SnackLovers</a><a title="giftideas" target="_blank" href="https://www.tiktok.com/tag/giftideas?refer=embed">#GiftIdeas</a><a title="snacktime" target="_blank" href="https://www.tiktok.com/tag/snacktime?refer=embed">#SnackTime</a><a title="treatyourself" target="_blank" href="https://www.tiktok.com/tag/treatyourself?refer=embed">#TreatYourself</a> <a target="_blank" title="♬ Product introduction, commercials, information, summer(1284254) - yutaka.T" href="https://www.tiktok.com/music/Product-introduction-commercials-information-summer-1284254-7133249539493857281?refer=embed">♬ Product introduction, commercials, information, summer(1284254) - yutaka.T</a> </section> </blockquote>`,
                }}
              />

              {/* Third TikTok Video */}
              <div
                className="tiktok-embed-container mb-8 lg:mb-0"
                dangerouslySetInnerHTML={{
                  __html: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@nut.cravings/video/7520248009863580983" data-video-id="7520248009863580983" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@nut.cravings" href="https://www.tiktok.com/@nut.cravings?refer=embed">@nut.cravings</a> Gift A Snack - Assorted Healthy Treats, Granola Bars, Chips, Candies &amp; More | Perfect for Gifting &amp; Care Packages <a title="giftasnack" target="_blank" href="https://www.tiktok.com/tag/giftasnack?refer=embed">#GiftASnack</a><a title="snackbox" target="_blank" href="https://www.tiktok.com/tag/snackbox?refer=embed">#SnackBox</a><a title="healthysnacks" target="_blank" href="https://www.tiktok.com/tag/healthysnacks?refer=embed">#HealthySnacks</a><a title="carepackage" target="_blank" href="https://www.tiktok.com/tag/carepackage?refer=embed">#CarePackage</a><a title="snackgiftbox" target="_blank" href="https://www.tiktok.com/tag/snackgiftbox?refer=embed">#SnackGiftBox</a><a title="treatyourself" target="_blank" href="https://www.tiktok.com/tag/treatyourself?refer=embed">#TreatYourself</a><a title="snacktime" target="_blank" href="https://www.tiktok.com/tag/snacktime?refer=embed">#SnackTime</a><a title="granolabars" target="_blank" href="https://www.tiktok.com/tag/granolabars?refer=embed">#GranolaBars</a><a title="snacklover" target="_blank" href="https://www.tiktok.com/tag/snacklover?refer=embed">#SnackLover</a><a title="giftingideas" target="_blank" href="https://www.tiktok.com/tag/giftingideas?refer=embed">#GiftingIdeas</a> <a title="tiktokmademebuyit" target="_blank" href="https://www.tiktok.com/tag/tiktokmademebuyit?refer=embed">#TikTokMadeMeBuyIt</a> <a target="_blank" title="♬ Cowboy Sunday - Amanda Rosa" href="https://www.tiktok.com/music/Cowboy-Sunday-7057541372371093505?refer=embed">♬ Cowboy Sunday - Amanda Rosa</a> </section> </blockquote>`,
                }}
              />
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* Final Call-to-Action Section */}
      <section className="py-6 sm:py-12 px-4 bg-gradient-to-br from-blue-100 via-blue-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-logo-green/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="card-enhanced p-4 sm:p-8 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-heading-red mb-3 sm:mb-4 tracking-tight">
              {cta.title}
            </h2>
            <p className="text-base text-snack-dark-blue/80 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
              {cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4 sm:mb-6">
              {cta.buttons.primary.text && (
                <button
                  onClick={() => {
                    if (cta.buttons.primary.action === "scrollToProducts") {
                      scrollToProducts();
                    } else if (
                      cta.buttons.primary.action.startsWith("scroll")
                    ) {
                      const elementId =
                        cta.buttons.primary.action
                          .replace("scrollTo", "")
                          .toLowerCase() + "-section";
                      document
                        .getElementById(elementId)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="bg-logo-green hover:bg-green-500 text-white font-bold px-6 sm:px-8 py-4 sm:py-3 rounded-xl text-base button-enhanced flex items-center justify-center gap-2 min-h-[56px] sm:min-h-[48px]"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cta.buttons.primary.text}
                </button>
              )}
              {cta.buttons.secondary.text && (
                <button
                  onClick={() => {
                    if (
                      cta.buttons.secondary.action === "scrollToTestimonials"
                    ) {
                      document
                        .getElementById("testimonials-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    } else if (
                      cta.buttons.secondary.action.startsWith("scroll")
                    ) {
                      const elementId =
                        cta.buttons.secondary.action
                          .replace("scrollTo", "")
                          .toLowerCase() + "-section";
                      document
                        .getElementById(elementId)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="border-2 border-logo-green text-logo-green hover:bg-logo-green hover:text-white font-bold px-6 sm:px-8 py-4 sm:py-3 rounded-xl text-base transition-all duration-300 min-h-[56px] sm:min-h-[48px]"
                >
                  {cta.buttons.secondary.text}
                </button>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-snack-dark-blue/60">
              {cta.trustIndicators.map((indicator, index) => {
                const IconComponent = getIconComponent(indicator.icon);
                return (
                  <div key={index} className="flex items-center gap-1.5">
                    <IconComponent className="w-3 h-3 text-logo-green" />
                    {indicator.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Conversion Boosters */}
      <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Decorative snack elements */}
        <div className="absolute top-8 left-16 text-2xl opacity-10 animate-pulse">
          ����
        </div>
        <div className="absolute bottom-8 right-20 text-2xl opacity-10 animate-pulse delay-1000">
          🍫
        </div>
        <div className="absolute top-16 right-32 text-xl opacity-10 animate-pulse delay-500">
          🥨
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Fast Shipping */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-logo-green/15 to-green-400/15 backdrop-blur-sm text-logo-green px-8 py-4 rounded-2xl shadow-lg border border-logo-green/20">
              <div className="w-12 h-12 bg-logo-green rounded-full flex items-center justify-center shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <span className="text-base font-bold">
                Fast & Guaranteed Shipping Across the United States
              </span>
            </div>
          </div>

          {/* Payment Icons */}
          <div className="text-center">
            <p className="text-gray-700 mb-6 text-lg font-bold">
              Secure Payment Methods
            </p>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <div className="w-20 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                VISA
              </div>
              <div className="w-20 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                MC
              </div>
              <div className="w-20 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                PayPal
              </div>
              <div className="w-20 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                AMEX
              </div>
            </div>

            {/* Additional security badges */}
            <div className="flex justify-center items-center gap-6 mt-8 flex-wrap">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200/50">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  SSL Secure
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200/50">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  256-bit Encryption
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200/50">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  PCI Compliant
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean, Minimal Footer */}
      <footer className="bg-gradient-to-br from-snack-dark-blue to-gray-900 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-6">
            {/* Logo and Description */}
            <div className="text-center md:text-left">
              <img
                src={footer.logo}
                alt="Gift A Snack Premium Snack Box Company Logo - Quality Snack Boxes for Gifts"
                className="h-20 w-auto mx-auto md:mx-0 mb-3 filter brightness-0 invert"
                loading="lazy"
                decoding="async"
              />
              <p className="text-gray-300 text-sm">{footer.description}</p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-4">
                {footer.quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.action === "scrollToTop") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else if (link.action === "scrollToProducts") {
                        document
                          .getElementById("products-section")
                          ?.scrollIntoView({ behavior: "smooth" });
                      } else if (link.action === "scrollToTestimonials") {
                        document
                          .getElementById("testimonials-section")
                          ?.scrollIntoView({ behavior: "smooth" });
                      } else if (link.action === "scrollToFeatures") {
                        document
                          .getElementById("why-choose-section")
                          ?.scrollIntoView({ behavior: "smooth" });
                      } else if (link.action === "scrollToTikTok") {
                        document
                          .querySelector(".tiktok-section")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-gray-300 hover:text-logo-green transition-colors duration-300 text-sm font-medium cursor-pointer"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="text-center md:text-right">
              <div className="flex justify-center md:justify-end gap-3">
                {footer.socialMedia.map((social, index) => {
                  const getSocialIcon = (platform: string) => {
                    switch (platform.toLowerCase()) {
                      case "tiktok":
                        return (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.34 6.34 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26z" />
                          </svg>
                        );
                      case "instagram":
                        return (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        );
                      case "facebook":
                        return (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        );
                      case "youtube":
                        return (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        );
                      case "twitter":
                        return (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        );
                      case "linkedin":
                        return (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        );
                      default:
                        return (
                          <span className="text-xs">{platform.charAt(0)}</span>
                        );
                    }
                  };

                  const getHoverColors = (platform: string) => {
                    switch (platform.toLowerCase()) {
                      case "tiktok":
                        return "hover:from-pink-500 hover:to-red-500";
                      case "instagram":
                        return "hover:from-pink-500 hover:to-purple-500";
                      case "facebook":
                        return "hover:from-blue-500 hover:to-blue-600";
                      case "youtube":
                        return "hover:from-red-500 hover:to-red-600";
                      case "twitter":
                        return "hover:from-blue-400 hover:to-blue-500";
                      case "linkedin":
                        return "hover:from-blue-600 hover:to-blue-700";
                      default:
                        return "hover:from-gray-500 hover:to-gray-600";
                    }
                  };

                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl ${getHoverColors(social.platform)}`}
                      aria-label={`Follow us on ${social.platform}`}
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-4 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Gift A Snack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Product Popup Modal */}
      {activePopup && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-50"
            style={{ backdropFilter: "blur(5px)" }}
            onClick={() => setActivePopup(null)}
          ></div>

          {/* Popup Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white w-full max-w-md mx-auto rounded-2xl shadow-2xl relative overflow-hidden"
              style={{
                animation: "modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePopup(null)}
                className="absolute top-4 right-4 z-30 w-8 h-8 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group border border-gray-200"
              >
                <X className="w-4 h-4 text-gray-700 group-hover:text-gray-900 group-hover:scale-110 transition-all" />
              </button>

              <div className="p-6">
                {/* Product Image */}
                {(activePopup?.popupData?.image || activePopup?.product?.image) && (
                  <div className="mb-4">
                    <img
                      src={
                        activePopup?.popupData?.image ||
                        `${activePopup?.product?.image}&quality=90&format=webp&width=400`
                      }
                      alt={`${activePopup?.product?.shortName} popup`}
                      className="w-full h-40 object-contain rounded-lg bg-gray-50 p-2"
                    />
                  </div>
                )}

                {/* Popup Title */}
                {activePopup?.popupData?.title && (
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {activePopup.popupData.title}
                  </h3>
                )}

                {/* Popup Description */}
                {activePopup?.popupData?.description && (
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {activePopup.popupData.description}
                  </p>
                )}

                {/* Promotional Text */}
                {activePopup?.popupData?.promotionalText && (
                  <div className="bg-gradient-to-r from-logo-green/10 to-green-400/10 border border-logo-green/20 rounded-lg p-3 mb-4">
                    <p className="text-logo-green font-semibold text-sm">
                      🎉 {activePopup.popupData.promotionalText}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {/* Order Now Button */}
                  {activePopup?.popupData?.orderNowLink && (
                    <button
                      className="flex-1 bg-logo-green hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      onClick={() => {
                        window.open(
                          activePopup.popupData.orderNowLink,
                          "_blank",
                        );
                      }}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Order Now
                    </button>
                  )}

                  {/* View Full Details Button */}
                  <button
                    className="flex-1 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => openFullProductModal(activePopup?.product)}
                  >
                    <Eye className="w-5 h-5" />
                    {activePopup?.popupData?.viewDetailsButtonText ||
                      "View Full Details"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Enhanced Floating Buy Now Button (Desktop & Mobile) */}
      {showFloatingButton && (
        <button
          onClick={openFirstProductModal}
          aria-label="Open product quick view to buy now"
          title="Quick order - View our premium snack boxes"
          className="group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-6 sm:px-8 py-4 sm:py-5 rounded-2xl shadow-2xl z-50 transition-all duration-500 transform hover:scale-110 active:scale-95 flex items-center gap-3 min-h-[68px] sm:min-h-[76px] min-w-[68px] sm:min-w-[160px] animate-bounce-in hover:animate-none focus:ring-4 focus:ring-blue-300 focus:outline-none"
          style={{
            filter: "drop-shadow(0 10px 25px rgba(59, 130, 246, 0.4))",
            animation:
              "float 3s ease-in-out infinite, pulse-glow 4s ease-in-out infinite",
          }}
        >
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-lg"></div>

          {/* Notification badge */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-pulse">
            !
          </div>

          {/* Button content */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              {/* Cart animation sparkle */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="hidden sm:block text-base font-black leading-tight">
                Buy Now
              </span>
              <span className="hidden sm:block text-xs opacity-90 font-medium">
                Quick Order
              </span>
              <span className="sm:hidden text-base font-black">Buy</span>
            </div>
          </div>

          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl"></div>
        </button>
      )}

      {/* Restructured Modal - 40/60 Desktop Layout */}
      {selectedProduct && (
        <>
          {/* Modal Backdrop with Blur Effect */}
          <div
            className="fixed inset-0 bg-black/60 z-50"
            style={{ backdropFilter: "blur(5px)" }}
            onClick={() => setSelectedProduct(null)}
          ></div>

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div
              className="bg-white w-full h-full sm:w-[90%] sm:h-[85%] sm:max-w-md sm:max-h-[90vh] lg:w-auto lg:h-auto lg:max-w-6xl lg:max-h-[90vh] shadow-2xl rounded-2xl sm:rounded-3xl lg:rounded-3xl relative overflow-hidden"
              style={{
                animation: "modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                maxHeight: "calc(100vh - 40px)",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile-Optimized Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group border border-gray-200"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900 group-hover:scale-110 transition-all" />
              </button>

              {/* Enhanced Mobile swipe indicator */}
              <div className="flex flex-col items-center pt-2 pb-3 lg:hidden">
                <div className="w-12 h-1 bg-gray-400 rounded-full mb-1"></div>
                <span className="text-xs text-gray-500 font-medium">
                  Swipe down to close
                </span>
              </div>

              {/* Desktop Layout: 40% Image | 60% Details */}
              <div className="flex flex-col lg:grid lg:grid-cols-5 h-full">
                {/* Image Section - 40% on Desktop, Full Width on Mobile */}
                <div className="lg:col-span-2 relative bg-gradient-to-br from-gray-50 to-gray-100 lg:bg-gray-50">
                  {/* Mobile: Properly Sized Image with Margins */}
                  <div className="lg:hidden w-full relative p-4 sm:p-6 flex items-center justify-center bg-gray-50">
                    <div className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto aspect-square">
                      <img
                        src={`${selectedProduct.image}&quality=90&format=webp&width=400`}
                        alt={`Gift A Snack ${selectedProduct.size} Premium Snack Box with Chips Crackers Cookies and Candy - Detailed Product View`}
                        className="w-full h-full object-contain rounded-2xl shadow-lg bg-white p-2"
                        loading="lazy"
                        width="400"
                        height="400"
                        style={{
                          animation:
                            "imageZoomIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
                          filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                        }}
                      />
                      {/* Mobile Discount Badge */}
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-xl text-sm font-black shadow-lg">
                        -
                        {(
                          ((parseFloat(
                            calculatePricing(
                              selectedProduct.price,
                            ).regularPrice.replace("$", ""),
                          ) -
                            parseFloat(
                              calculatePricing(
                                selectedProduct.price,
                              ).salePrice.replace("$", ""),
                            )) /
                            parseFloat(
                              calculatePricing(
                                selectedProduct.price,
                              ).regularPrice.replace("$", ""),
                            )) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Fixed Height Image Container - 100% of modal height */}
                  <div className="hidden lg:flex h-full p-8 items-center justify-center relative">
                    <div className="relative w-full h-full max-w-md mx-auto flex items-center justify-center">
                      <img
                        src={`${selectedProduct.image}&quality=90&format=webp&width=400`}
                        alt={`Gift A Snack ${selectedProduct.size} Premium Snack Box with Chips Crackers Cookies and Candy - Detailed Product View`}
                        className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                        loading="lazy"
                        width="400"
                        height="400"
                        style={{
                          animation:
                            "imageZoomIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
                          filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.2))",
                        }}
                      />
                      {/* Desktop Discount Badge */}
                      <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-black shadow-xl">
                        -
                        {(
                          ((parseFloat(
                            calculatePricing(
                              selectedProduct.price,
                            ).regularPrice.replace("$", ""),
                          ) -
                            parseFloat(
                              calculatePricing(
                                selectedProduct.price,
                              ).salePrice.replace("$", ""),
                            )) /
                            parseFloat(
                              calculatePricing(
                                selectedProduct.price,
                              ).regularPrice.replace("$", ""),
                            )) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                      {/* Premium Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-2xl pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Details Section - 60% on Desktop */}
                <div className="lg:col-span-3 flex flex-col h-full relative">
                  {/* Mobile-Optimized Scrollable Content Area */}
                  <div
                    className="flex-1 overflow-y-auto px-4 py-3 sm:px-6 sm:py-4 lg:p-8 pb-24 sm:pb-28 lg:pb-32"
                    style={{
                      maxHeight: "calc(100vh - 200px)",
                    }}
                  >
                    {/* Mobile-Optimized Title + Rating */}
                    <div className="mb-4 sm:mb-6">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4">
                        {selectedProduct.shortName || selectedProduct.name}
                      </h2>

                      {/* Mobile-Optimized Rating with gold stars */}
                      {selectedProduct.rating && (
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${i < selectedProduct.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm sm:text-base text-gray-600 font-medium">
                            ({selectedProduct.reviewCount} reviews)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Mobile-Optimized Price Section */}
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100">
                      <div className="flex items-baseline gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-red-600">
                          {calculatePricing(selectedProduct.price).salePrice}
                        </span>
                        <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-500 line-through">
                          {calculatePricing(selectedProduct.price).regularPrice}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <span className="bg-green-100 text-green-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm font-bold inline-block w-fit">
                          Save $
                          {(
                            parseFloat(
                              calculatePricing(
                                selectedProduct.price,
                              ).regularPrice.replace("$", ""),
                            ) -
                            parseFloat(
                              calculatePricing(
                                selectedProduct.price,
                              ).salePrice.replace("$", ""),
                            )
                          ).toFixed(2)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-base sm:text-lg">🍪</span>
                          <span className="text-base sm:text-lg">🍫</span>
                          <span className="text-base sm:text-lg">🥨</span>
                          <span className="text-sm sm:text-base text-gray-600 ml-2 font-medium">
                            {selectedProduct.size}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Promotional Text */}
                    {selectedProduct.promotionalText && (
                      <div className="mb-6">
                        <div className="bg-gradient-to-r from-logo-green/10 to-green-400/10 border border-logo-green/20 rounded-lg p-4 text-center">
                          <p className="text-logo-green font-bold text-base sm:text-lg">
                            {selectedProduct.promotionalText}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Product Description */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        About this product
                      </h3>
                      {selectedProduct.bulletPoints ? (
                        <ul className="space-y-4">
                          {selectedProduct.bulletPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </div>
                              <span className="text-base text-gray-700 leading-relaxed">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-700 leading-relaxed text-base">
                          {selectedProduct.description}
                        </p>
                      )}
                    </div>

                    {/* What's Included */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        What's included
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Package className="w-5 h-5 text-green-600" />
                          <span className="text-base text-gray-700">
                            Premium variety of snacks ({selectedProduct.size})
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Gift className="w-5 h-5 text-green-600" />
                          <span className="text-base text-gray-700">
                            Beautiful gift packaging
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-base text-gray-700">
                            Greeting card included
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <Truck className="w-5 h-5 text-green-600" />
                          <span className="text-base text-gray-700">
                            Fast shipping across the US
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Shipping & Returns */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Shipping & Returns
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                          <span className="text-base text-gray-700">
                            Free shipping on orders over $35
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                          <span className="text-base text-gray-700">
                            30-day satisfaction guarantee
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                          <span className="text-base text-gray-700">
                            Secure packaging guarantee
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-Optimized Sticky Buy Button */}
                  <div className="lg:sticky lg:bottom-0 sticky bottom-0 sm:relative bg-white border-t border-gray-200 p-3 sm:p-4 lg:p-6 shadow-lg lg:shadow-none lg:border-t lg:rounded-b-3xl z-40 rounded-b-2xl sm:rounded-b-3xl">
                    <a
                      href={selectedProduct.walmartLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 sm:py-4 lg:py-5 text-center rounded-xl sm:rounded-2xl text-base sm:text-lg lg:text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 sm:gap-3"
                    >
                      <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                      <div className="flex flex-col">
                        <span className="font-black text-sm sm:text-base">
                          BUY NOW ON
                        </span>
                        <span className="font-black text-yellow-300 text-sm sm:text-base">
                          WALMART
                        </span>
                      </div>
                      <div className="bg-yellow-400 text-blue-800 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-sm sm:text-base font-black">
                        {calculatePricing(selectedProduct.price).salePrice}
                      </div>
                    </a>

                    {/* Mobile-Optimized Trust indicators */}
                    <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-6 mt-2 sm:mt-3 text-xs sm:text-sm lg:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                        <span className="hidden sm:inline">Fast Shipping</span>
                        <span className="sm:hidden text-xs">Shipping</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                        <span className="hidden sm:inline">Secure Payment</span>
                        <span className="sm:hidden text-xs">Secure</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                        <span className="hidden sm:inline">Easy Returns</span>
                        <span className="sm:hidden text-xs">Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
