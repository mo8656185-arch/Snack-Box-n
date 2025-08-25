import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  CheckCircle,
  Package,
  Gift,
  Truck,
} from "lucide-react";

// Product data - in a real app, this would come from an API
const products = [
  {
    id: 1,
    slug: "snack-box-35-count",
    name: "Gift a Snack Spread the Joy Snack Pack, Assorted College Care Package for Students, Office Party, 35 Count",
    shortName: "Gift a Snack – Spread the Joy Snack Pack",
    description:
      "Spread joy with the perfect gift for adults, teens, and college students. Premium assortment of chips, crackers, cookies, and candy in beautifully branded high-end packaging.",
    size: "35 ct",
    price: "$22.97",
    rating: 5,
    reviewCount: 286,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F77788b1b06194d9e9278b4a63bb3471e?format=webp&width=800",
    walmartLink:
      "https://www.walmart.com/ip/Gift-a-Snack-35-Count-Snacks-Box-with-Variety-Assortment-of-snack-packs-chips-variety-Crackers-Cookies-Candy/6277108895?classType=VARIANT",
    bulletPoints: [
      "Beautifully branded high-end packaging for an impressive gift.",
      "Convenient individual servings for on-the-go snacking.",
      "Includes a heartwarming greeting card for a personal touch.",
      "Spread joy with the perfect gift for adults, teens, and college students.",
      "Variety assortment of chips, crackers, cookies, and candy.",
      "Honesty is our main value - some snacks may be replaced for similar or more value.",
      "Gift a Snack - the ultimate snack box for any occasion.",
    ],
  },
  {
    id: 2,
    slug: "chip-variety-snack-box-42-count",
    name: "Gift a Snack Chip Variety Snack Box – Snack Pack Variety Box, 42 Count",
    shortName: "Gift a Snack Chip Variety Snack Box",
    description:
      "Variety assortment of brands like Airheads, Cheez It, and Famous Amos. Contains 42 individually wrapped treats in high-end packaging with a greeting card.",
    size: "42 ct",
    price: "$23.96",
    rating: 5,
    reviewCount: 286,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2Fcd06d6ab52e341e2b57efd6b128aeeaa?format=webp&width=800",
    walmartLink:
      "https://www.walmart.com/ip/Gift-a-Snack-Chip-Variety-Snack-Box-Snack-Pack-Variety-Box-42-Count/5298521902?classType=VARIANT&athbdg=L1600",
    bulletPoints: [
      "The Gift a Snack Chip Variety Snack Box contains 42 individually wrapped treats, including chips, crackers, cookies, and candy.",
      "Variety assortment of brands like Airheads, Cheez It, and Famous Amos.",
      "Comes with a heartwarming greeting card and high-end packaging.",
      "Ideal for adults, teens, and college students, and suitable for on-the-go snacking.",
      "Some snacks may be replaced with similar or higher value items.",
      "Perfect as a care package or a convenient snack option.",
    ],
  },
  {
    id: 3,
    slug: "variety-snack-box-52-count",
    name: "Gift a Snack 52 Count Snack Box with Variety Snacks, Chips, Crackers, Cookies, Candy",
    shortName: "Gift a Snack 52 Count Snack Box",
    description:
      "52-count snack box filled with a diverse variety of sweet and salty treats. Beautifully branded high-end packaging perfect for gifts and care packages.",
    size: "52 ct",
    price: "$31.46",
    rating: 5,
    reviewCount: 286,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F5ff73d8278224c2ab0b862f059e3802c?format=webp&width=800",
    walmartLink:
      "https://www.walmart.com/ip/Gift-a-Snack-52-Count-Snack-Box-with-Variety-Snacks-Chips-Crackers-Cookies-Candy/5915077819?classType=VARIANT&athbdg=L1900",
    bulletPoints: [
      "Beautifully branded high-end packaging for an impressive gift.",
      "Convenient individual servings for on-the-go snacking.",
      "Includes a heartwarming greeting card for a personal touch.",
      "Spread joy with the perfect gift for adults, teens, and college students.",
      "Variety assortment of chips, crackers, cookies, and candy.",
      "Honesty is our main value - some snacks may be replaced for similar or more value.",
      "Gift a Snack - the ultimate snack box for any occasion.",
      "Mouthwatering treats inside - Airheads, Cheez It, Famous Amos, and more!",
    ],
  },
  {
    id: 4,
    slug: "ultimate-snack-box-105-count",
    name: "Ultimate Snack Box Variety Pack – 105 Count by Gift A Snack",
    shortName: "Ultimate Snack Box – 105 Count",
    description:
      "105-count pack with America's favorite candies, chips, crackers, and bars. Perfectly packaged in individual servings for on-the-go ease and ideal as a gift.",
    size: "105 ct",
    price: "$45.97",
    rating: 5,
    reviewCount: 286,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F936b74c9566f406ebebd96074d052d09?format=webp&width=800",
    walmartLink:
      "https://www.walmart.com/ip/Ultimate-Snack-Box-Variety-Pack-105-Count-by-Gift-A-Snack/14496505954?classType=VARIANT",
    bulletPoints: [
      "105-count pack with America's favorite candies, chips, crackers, and bars.",
      "Perfectly packaged in individual servings for on-the-go ease.",
      "Ideal gift for adults, teens, college students, or anyone who deserves a treat.",
    ],
  },
];

// Helper function to calculate pricing
const calculatePricing = (salePrice: string) => {
  const salePriceNumeric = parseFloat(salePrice.replace("$", ""));
  const regularPriceCalculated = salePriceNumeric / 0.3;
  const regularPriceRounded = Math.floor(regularPriceCalculated) + 0.99;
  return {
    salePrice: salePrice,
    regularPrice: `$${regularPriceRounded.toFixed(2)}`,
  };
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

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<(typeof products)[0] | null>(null);

  useEffect(() => {
    const foundProduct = products.find((p) => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);

      // Update page title and meta description for SEO
      document.title = `${foundProduct.shortName} | Premium Snack Boxes – Gift A Snack`;

      // Update meta description
      const metaDescription = document.querySelector(
        'meta[name="description"]',
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `${foundProduct.description} Order ${foundProduct.shortName} on Walmart with fast shipping.`,
        );
      }
    } else {
      // Product not found, redirect to 404
      navigate("/404", { replace: true });
    }
  }, [slug, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-logo-green mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  const pricing = calculatePricing(product.price);
  const savingsPercent = (
    ((parseFloat(pricing.regularPrice.replace("$", "")) -
      parseFloat(pricing.salePrice.replace("$", ""))) /
      parseFloat(pricing.regularPrice.replace("$", ""))) *
    100
  ).toFixed(0);

  return (
    <div className="min-h-screen bg-blue-50">
      {/* JSON-LD Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: product.name,
          image: product.image,
          description: product.description,
          sku: product.slug,
          brand: {
            "@type": "Brand",
            name: "Gift A Snack",
          },
          offers: {
            "@type": "Offer",
            url: `https://www.giftasnack.com/${product.slug}`,
            priceCurrency: "USD",
            price: pricing.salePrice.replace("$", ""),
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "Gift A Snack",
            },
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        })}
      </script>

      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-logo-green transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to all products</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-800">
            <div className="relative">
              <img
                src={`${product.image}&quality=90&format=webp&width=600`}
                alt={`Gift A Snack ${product.size} Premium Snack Box with Chips Crackers Cookies and Candy for Gifts and Care Packages`}
                className="w-full h-auto object-contain rounded-xl"
                loading="eager"
              />

              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-black shadow-xl">
                -{savingsPercent}%
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-heading-red leading-tight mb-4">
                {product.shortName}
              </h1>

              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <StarRating
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                  />
                </div>
              )}
            </div>

            {/* Price Section */}
            <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-4xl lg:text-5xl font-black text-red-600">
                  {pricing.salePrice}
                </span>
                <span className="text-2xl lg:text-3xl text-gray-400 line-through">
                  {pricing.regularPrice}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                  Save $
                  {(
                    parseFloat(pricing.regularPrice.replace("$", "")) -
                    parseFloat(pricing.salePrice.replace("$", ""))
                  ).toFixed(2)}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🍪</span>
                  <span className="text-lg">🍫</span>
                  <span className="text-lg">🥨</span>
                  <span className="text-sm text-gray-500 ml-2 font-medium">
                    {product.size}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                About this product
              </h2>
              <p className="text-gray-700 leading-relaxed text-base mb-4">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Product Features
              </h3>
              <ul className="space-y-3">
                {product.bulletPoints.map((point, index) => (
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
            </div>

            {/* What's Included */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                What's included
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Package className="w-5 h-5 text-green-600" />
                  <span className="text-base text-gray-700">
                    Premium variety of snacks ({product.size})
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

            {/* Buy Button */}
            <div className="sticky bottom-4">
              <a
                href={product.walmartLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 text-center rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-6 h-6" />
                <div className="flex flex-col">
                  <span className="font-black">BUY NOW ON</span>
                  <span className="font-black text-yellow-300">WALMART</span>
                </div>
                <div className="bg-yellow-400 text-blue-800 px-3 py-1.5 rounded-full text-base font-black">
                  {pricing.salePrice}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
