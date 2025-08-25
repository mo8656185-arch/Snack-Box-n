import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HeroAdmin from "./pages/admin/HeroAdmin";
import CarouselAdmin from "./pages/admin/CarouselAdmin";
import FeaturesAdmin from "./pages/admin/FeaturesAdmin";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin";
import TikTokAdmin from "./pages/admin/TikTokAdmin";
import CTAAdmin from "./pages/admin/CTAAdmin";
import SEOAdmin from "./pages/admin/SEOAdmin";
import FooterAdmin from "./pages/admin/FooterAdmin";
import PopupsAdmin from "./pages/admin/PopupsAdmin";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Enhanced global error handler for TikTok embed errors
const setupGlobalErrorHandler = () => {
  // Handle uncaught promise rejections (common with TikTok embed script)
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const isEmbedError =
      reason &&
      ((typeof reason.message === "string" &&
        reason.message.includes("length")) ||
        (typeof reason.stack === "string" &&
          reason.stack.includes("embed_lib")) ||
        (typeof reason.stack === "string" && reason.stack.includes("tiktok")) ||
        (typeof reason.message === "string" &&
          reason.message.includes("Cannot read properties of undefined")));

    if (isEmbedError) {
      console.warn("TikTok embed error caught globally (promise):", reason);
      event.preventDefault(); // Prevent error from being logged to console
    }
  });

  // Handle regular errors with enhanced pattern matching
  window.addEventListener("error", (event) => {
    const isEmbedError =
      event.filename?.includes("embed_lib") ||
      event.filename?.includes("tiktok.com") ||
      event.error?.stack?.includes("embed_lib") ||
      event.error?.stack?.includes("tiktok") ||
      (event.error?.message?.includes("length") &&
        (event.filename?.includes("tiktok") ||
          event.error?.stack?.includes("embed"))) ||
      event.error?.message?.includes("Cannot read properties of undefined");

    if (isEmbedError) {
      console.warn("TikTok embed script error caught globally:", {
        message: event.error?.message,
        filename: event.filename,
        lineno: event.lineno,
      });
      event.preventDefault(); // Prevent error from being logged to console
    }
  });

  // Additional protection: override console.error temporarily for TikTok scripts
  const originalConsoleError = console.error;
  console.error = function (...args) {
    const errorMessage = args.join(" ");
    if (
      errorMessage.includes("embed_lib") ||
      errorMessage.includes("Cannot read properties of undefined") ||
      (errorMessage.includes("length") && errorMessage.includes("tiktok"))
    ) {
      console.warn("TikTok embed console error suppressed:", errorMessage);
      return;
    }
    originalConsoleError.apply(console, args);
  };

  // Add global protection for Array.from operations that TikTok embed might use
  const originalArrayFrom = Array.from;
  Array.from = function (arrayLike, mapFn?, thisArg?) {
    try {
      if (!arrayLike) return [];
      // Ensure arrayLike has a length property
      if (typeof arrayLike === "object" && !("length" in arrayLike)) {
        return [];
      }
      return originalArrayFrom.call(Array, arrayLike, mapFn, thisArg);
    } catch (e) {
      console.warn("Protected Array.from caught error:", e);
      return [];
    }
  };

  // Add protection for Object.keys which might be used on undefined objects
  const originalObjectKeys = Object.keys;
  Object.keys = function (obj) {
    try {
      if (!obj || typeof obj !== "object") return [];
      return originalObjectKeys.call(Object, obj);
    } catch (e) {
      console.warn("Protected Object.keys caught error:", e);
      return [];
    }
  };
};

const App = () => {
  useEffect(() => {
    setupGlobalErrorHandler();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/snack-box-35-count" element={<ProductPage />} />
            <Route
              path="/chip-variety-snack-box-42-count"
              element={<ProductPage />}
            />
            <Route
              path="/variety-snack-box-52-count"
              element={<ProductPage />}
            />
            <Route
              path="/ultimate-snack-box-105-count"
              element={<ProductPage />}
            />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="hero" element={<HeroAdmin />} />
              <Route path="carousel" element={<CarouselAdmin />} />
              <Route path="features" element={<FeaturesAdmin />} />
              <Route path="products" element={<ProductsAdmin />} />
              <Route path="popups" element={<PopupsAdmin />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
              <Route path="tiktok" element={<TikTokAdmin />} />
              <Route path="cta" element={<CTAAdmin />} />
              <Route path="seo" element={<SEOAdmin />} />
              <Route path="footer" element={<FooterAdmin />} />
            </Route>

            <Route path="/:slug" element={<ProductPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Fix for React createRoot warning during development HMR
const rootElement = document.getElementById("root")!;

// Check if we already have a root instance attached to avoid multiple createRoot calls
if (!(rootElement as any)._reactRoot) {
  const root = createRoot(rootElement);
  (rootElement as any)._reactRoot = root;
  root.render(<App />);
} else {
  // If root already exists, just re-render
  (rootElement as any)._reactRoot.render(<App />);
}
