import React from "react";
import { useAdminData } from "@/hooks/useAdminData";

const AutoScrollCarousel = () => {
  const { data } = useAdminData();

  if (!data?.carousel) {
    return null;
  }

  const { title, description, images } = data.carousel;

  // Duplicate the images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-16 left-20 text-4xl rotate-12">🍪</div>
        <div className="absolute top-32 right-24 text-3xl -rotate-12">🍫</div>
        <div className="absolute bottom-20 left-32 text-3xl rotate-45">🥨</div>
        <div className="absolute bottom-16 right-20 text-4xl -rotate-45">
          🎁
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-heading-red mb-4 tracking-tight">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center mt-6">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-logo-green to-transparent rounded-full"></div>
            <div className="mx-4 text-logo-green text-2xl">🎁</div>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-logo-green to-transparent rounded-full"></div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50/50 via-white to-blue-50/50 p-8">
          <div className="flex animate-scroll-carousel">
            {duplicatedImages.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="flex-shrink-0 w-72 sm:w-80 lg:w-96 mx-3 sm:mx-4 group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-contain rounded-xl"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Overlay effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-logo-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional trust elements */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200/50">
            <span className="text-logo-green text-lg">✨</span>
            <span className="text-sm font-semibold text-gray-700">
              Beautifully packaged for gifting
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutoScrollCarousel;
