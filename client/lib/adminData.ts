// Default data structure for all admin-managed content
export interface AdminData {
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
  };
  hero: {
    logo: string;
    badge: {
      text: string;
      icon: string;
    };
    title: {
      line1: string;
      line2: string;
    };
    description: {
      desktop: string;
      mobile: string;
    };
    buttons: {
      primary: {
        text: string;
        action: string;
      };
      secondary: {
        text: string;
        action: string;
      };
    };
    trustIndicators: Array<{
      icon: string;
      text: string;
    }>;
    heroImage: string;
  };
  carousel: {
    title: string;
    description: string;
    images: Array<{
      id: number;
      src: string;
      alt: string;
    }>;
  };
  features: {
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  products: Array<{
    id: number;
    name: string;
    shortName: string;
    description: string;
    size: string;
    price: string;
    rating: number;
    reviewCount: number;
    image: string;
    walmartLink: string;
    bulletPoints: string[];
    tags: string[]; // For badges like "Popular", "Best Value", etc.
    promotionalText?: string; // Optional promotional text to display in modal
  }>;
  testimonials: Array<{
    text: string;
    name: string;
    rating: number;
    avatar: string;
  }>;
  tiktok: {
    title: string;
    description: string;
    followText: string;
    followLink: string;
    videos: Array<{
      id: string;
      embedCode: string;
      title: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    buttons: {
      primary: {
        text: string;
        action: string;
      };
      secondary: {
        text: string;
        action: string;
      };
    };
    trustIndicators: Array<{
      icon: string;
      text: string;
    }>;
  };
  popups: {
    35: {
      title: string;
      description: string;
      image: string;
      promotionalText: string;
      orderNowLink: string;
      buyButtonText: string;
      whatsIncluded: Array<{
        icon: string;
        text: string;
      }>;
      shippingReturns: Array<{
        icon: string;
        text: string;
      }>;
    };
    42: {
      title: string;
      description: string;
      image: string;
      promotionalText: string;
      orderNowLink: string;
      buyButtonText: string;
      whatsIncluded: Array<{
        icon: string;
        text: string;
      }>;
      shippingReturns: Array<{
        icon: string;
        text: string;
      }>;
    };
    52: {
      title: string;
      description: string;
      image: string;
      promotionalText: string;
      orderNowLink: string;
      buyButtonText: string;
      whatsIncluded: Array<{
        icon: string;
        text: string;
      }>;
      shippingReturns: Array<{
        icon: string;
        text: string;
      }>;
    };
    105: {
      title: string;
      description: string;
      image: string;
      promotionalText: string;
      orderNowLink: string;
      buyButtonText: string;
      whatsIncluded: Array<{
        icon: string;
        text: string;
      }>;
      shippingReturns: Array<{
        icon: string;
        text: string;
      }>;
    };
  };
  footer: {
    logo: string;
    description: string;
    quickLinks: Array<{
      text: string;
      action: string;
    }>;
    socialMedia: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
    copyright: string;
  };
}

// Default data with current static content
const defaultAdminData: AdminData = {
  seo: {
    metaTitle: "Gift A Snack - Premium Snack Boxes for Gifts & Care Packages",
    metaDescription:
      "Premium assortment of delicious snacks, beautifully packaged. Perfect for gifts, office treats, and special occasions. Order now from Walmart.",
    metaKeywords:
      "snack box, gift box, care package, premium snacks, variety pack, chips, cookies, candy, office snacks",
  },
  hero: {
    logo: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2Fcd932fcd18414ba798762d622c2b825c?format=webp&width=300&quality=90",
    badge: {
      text: "Premium Quality Guaranteed",
      icon: "CheckCircle",
    },
    title: {
      line1: "Premium Snack Boxes",
      line2: "– Gift A Snack",
    },
    description: {
      desktop:
        "Premium assortment of delicious snacks, beautifully packaged. Perfect for gifts, office treats, and special occasions.",
      mobile: "Premium snack boxes perfect for gifts and special occasions.",
    },
    buttons: {
      primary: {
        text: "Shop Now",
        action: "scrollToProducts",
      },
      secondary: {
        text: "Learn More",
        action: "scrollToFeatures",
      },
    },
    trustIndicators: [
      { icon: "CheckCircle", text: "30+ Snack Varieties" },
      { icon: "CheckCircle", text: "Fast Shipping" },
      { icon: "CheckCircle", text: "Gift Ready" },
    ],
    heroImage:
      "https://cdn.builder.io/api/v1/image/assets%2Ffc09862a9f0941d4aeda13a8cb2480bc%2F9a927196010f464595d03440e3666d58?format=webp&width=700&quality=90",
  },
  carousel: {
    title: "Our Snack Box Variety Collection",
    description:
      "Discover the perfect snack experience for every occasion and celebration",
    images: [
      {
        id: 1,
        src: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F2c3b085707884c2f88ed094decfffa88?format=webp&width=600&quality=90",
        alt: "Gift A Snack Premium Snack Box Collection Featuring Chips Crackers Cookies and Candy Variety Packs",
      },
      {
        id: 2,
        src: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2Ffb86c1a2698e4415a1b414f0ae8c1f33?format=webp&width=600&quality=90",
        alt: "Gift A Snack Variety Pack Assortment Perfect for Gifts and Care Packages with Quality Snacks",
      },
      {
        id: 3,
        src: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F0fc267a65d674083b4be3bd27a90b563?format=webp&width=600&quality=90",
        alt: "Gift A Snack Premium Care Package Collection with Diverse Snack Options for Every Occasion",
      },
      {
        id: 4,
        src: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F5277a0906b534f7d80d910806e3426de?format=webp&width=600&quality=90",
        alt: "Gift A Snack Quality Snack Box Collection with Chips Crackers and Sweet Treats for Gifting",
      },
      {
        id: 5,
        src: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F97422d3d39ee42519a91e3fbb0835571?format=webp&width=600&quality=90",
        alt: "Gift A Snack Premium Variety Pack with Assorted Snacks Perfect for Office Treats and Gifts",
      },
    ],
  },
  features: {
    title: "Why Choose Gift A Snack Box?",
    description:
      "Discover what makes our snack boxes the perfect choice for every occasion and celebration",
    items: [
      {
        title: "Huge Variety",
        description: "Over 30 types of snacks",
        icon: "Package",
      },
      {
        title: "Luxury Packaging",
        description: "Perfect as a gift",
        icon: "Gift",
      },
      {
        title: "For Everyone",
        description: "Kids, students, employees",
        icon: "Users",
      },
      {
        title: "Fresh & Tasty",
        description: "Guaranteed quality",
        icon: "Sparkles",
      },
      {
        title: "Easy to Order",
        description: "Fast shipping",
        icon: "Zap",
      },
    ],
  },
  products: [
    {
      id: 1,
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
      tags: ["Starter Pack"],
      promotionalText: "Limited time offer with free shipping!",
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
      tags: ["Popular"],
      promotionalText: "Best value for families!",
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
      tags: ["Best Value"],
      promotionalText: "Customer favorite!",
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
      tags: ["Ultimate"],
      promotionalText:
        "America's favorite candies, chips, crackers, and bars included!",
      bulletPoints: [
        "105-count pack with America's favorite candies, chips, crackers, and bars.",
        "Perfectly packaged in individual servings for on-the-go ease.",
        "Ideal gift for adults, teens, college students, or anyone who deserves a treat.",
      ],
    },
  ],
  testimonials: [
    {
      text: "The best gift I've ever given my friend! Elegant packaging and the products are fresh and super tasty.",
      name: "Sarah M.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    },
    {
      text: "I bought the box for my office and everyone loved the wide variety of snacks.",
      name: "Mike R.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    },
    {
      text: "Fast delivery, excellent quality, and I recommend it to everyone.",
      name: "Jessica L.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    },
    {
      text: "Perfect for our family movie nights! The kids absolutely love the variety of treats in each box.",
      name: "Amanda K.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    },
    {
      text: "Outstanding quality and presentation. This snack box exceeded all my expectations!",
      name: "David P.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    },
    {
      text: "Great customer service and amazing products. Will definitely order again for upcoming holidays.",
      name: "Lisa T.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    },
  ],
  tiktok: {
    title: "Watch Gift A Snack on TikTok",
    description:
      "See our snack boxes in action and get inspired for your next order",
    followText: "Follow us on TikTok",
    followLink: "https://tiktok.com/@nut.cravings",
    videos: [
      {
        id: "7522097145223187725",
        title: "Gift A Snack - Assorted Healthy Treats",
        embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@nut.cravings/video/7522097145223187725" data-video-id="7522097145223187725" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@nut.cravings" href="https://www.tiktok.com/@nut.cravings?refer=embed">@nut.cravings</a> Gift A Snack - Assorted Healthy Treats, Granola Bars, Chips, Candies &amp; More | Perfect for Gifting &amp; Care Packages <a title="giftasnack" target="_blank" href="https://www.tiktok.com/tag/giftasnack?refer=embed">#GiftASnack</a> <a title="snackbox" target="_blank" href="https://www.tiktok.com/tag/snackbox?refer=embed">#SnackBox</a> <a title="healthytreats" target="_blank" href="https://www.tiktok.com/tag/healthytreats?refer=embed">#HealthyTreats</a> <a title="carepackage" target="_blank" href="https://www.tiktok.com/tag/carepackage?refer=embed">#CarePackage</a> <a title="giftboxideas" target="_blank" href="https://www.tiktok.com/tag/giftboxideas?refer=embed">#GiftBoxIdeas</a> <a title="snacklovers" target="_blank" href="https://www.tiktok.com/tag/snacklovers?refer=embed">#SnackLovers</a> <a title="granolabars" target="_blank" href="https://www.tiktok.com/tag/granolabars?refer=embed">#GranolaBars</a> <a title="chipsandcandy" target="_blank" href="https://www.tiktok.com/tag/chipsandcandy?refer=embed">#ChipsAndCandy</a> <a title="snacktime" target="_blank" href="https://www.tiktok.com/tag/snacktime?refer=embed">#SnackTime</a> <a title="foodgiftbo..." target="_blank" href="https://www.tiktok.com/tag/foodgiftbo?refer=embed">#foodgiftbo</a></blockquote>`,
      },
      {
        id: "7521731881373682958",
        title: "Gift A Snack - Variety Pack",
        embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@nut.cravings/video/7521731881373682958" data-video-id="7521731881373682958" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@nut.cravings" href="https://www.tiktok.com/@nut.cravings?refer=embed">@nut.cravings</a> Gift A Snack - Assorted Healthy Treats, Granola Bars, Chips, Candies &amp; More | Perfect for Gifting &amp; Care Packages <a title="giftasnack" target="_blank" href="https://www.tiktok.com/tag/giftasnack?refer=embed">#GiftASnack</a><a title="snackbox" target="_blank" href="https://www.tiktok.com/tag/snackbox?refer=embed">#SnackBox</a><a title="healthysnacking" target="_blank" href="https://www.tiktok.com/tag/healthysnacking?refer=embed">#HealthySnacking</a><a title="carepackage" target="_blank" href="https://www.tiktok.com/tag/carepackage?refer=embed">#CarePackage</a><a title="snacklovers" target="_blank" href="https://www.tiktok.com/tag/snacklovers?refer=embed">#SnackLovers</a><a title="giftideas" target="_blank" href="https://www.tiktok.com/tag/giftideas?refer=embed">#GiftIdeas</a><a title="snacktime" target="_blank" href="https://www.tiktok.com/tag/snacktime?refer=embed">#SnackTime</a><a title="treatyourself" target="_blank" href="https://www.tiktok.com/tag/treatyourself?refer=embed">#TreatYourself</a> <a target="_blank" title="♬ Product introduction, commercials, information, summer(1284254) - yutaka.T" href="https://www.tiktok.com/music/Produ..." target="_blank" href="https://www.tiktok.com/music/Produ..."></blockquote>`,
      },
      {
        id: "7520248009863580983",
        title: "Gift A Snack - Premium Collection",
        embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@nut.cravings/video/7520248009863580983" data-video-id="7520248009863580983" style="max-width: 605px;min-width: 325px;"> <section> <a target="_blank" title="@nut.cravings" href="https://www.tiktok.com/@nut.cravings?refer=embed">@nut.cravings</a> Gift A Snack - Assorted Healthy Treats, Granola Bars, Chips, Candies &amp; More | Perfect for Gifting &amp; Care Packages <a title="giftasnack" target="_blank" href="https://www.tiktok.com/tag/giftasnack?refer=embed">#GiftASnack</a><a title="snackbox" target="_blank" href="https://www.tiktok.com/tag/snackbox?refer=embed">#SnackBox</a><a title="healthysnacks" target="_blank" href="https://www.tiktok.com/tag/healthysnacks?refer=embed">#HealthySnacks</a><a title="carepackage" target="_blank" href="https://www.tiktok.com/tag/carepackage?refer=embed">#CarePackage</a><a title="snackgiftbox" target="_blank" href="https://www.tiktok.com/tag/snackgiftbox?refer=embed">#SnackGiftBox</a><a title="treatyourself" target="_blank" href="https://www.tiktok.com/tag/treatyourself?refer=embed">#TreatYourself</a><a title="snacktime" target="_blank" href="https://www.tiktok.com/tag/snacktime?refer=embed">#SnackTime</a><a title="granolabars" target="_blank" href="https://www.tiktok.com/tag/granolabars?refer=embed">#GranolaBars</a><a title="snacklover" target="_blank" href="https://www.tiktok.com/tag/snacklover?refer=embed">#SnackLover</a><a title="giftingideas" target="..."></blockquote>`,
      },
    ],
  },
  cta: {
    title: "Ready to Experience the Tastiest Gift A Snack Box?",
    description:
      "Join thousands of satisfied customers. Choose your perfect size and order now from Walmart.",
    buttons: {
      primary: {
        text: "Order Now",
        action: "scrollToProducts",
      },
      secondary: {
        text: "Read Reviews",
        action: "scrollToTestimonials",
      },
    },
    trustIndicators: [
      { icon: "CheckCircle", text: "30+ Premium Snacks" },
      { icon: "CheckCircle", text: "Gift-Ready Packaging" },
      { icon: "CheckCircle", text: "Fast US Shipping" },
      { icon: "CheckCircle", text: "Satisfaction Guaranteed" },
    ],
  },
  popups: {
    35: {
      title: "Spread the Joy Snack Pack",
      description:
        "Perfect starter pack for spreading joy! 35 count assortment of chips, crackers, cookies, and candy in beautifully branded packaging.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F77788b1b06194d9e9278b4a63bb3471e?format=webp&width=400",
      promotionalText: "Limited time offer with free shipping!",
      orderNowLink:
        "https://www.walmart.com/ip/Gift-a-Snack-35-Count-Snacks-Box-with-Variety-Assortment-of-snack-packs-chips-variety-Crackers-Cookies-Candy/6277108895?classType=VARIANT",
      viewDetailsButtonText: "View Full Details",
    },
    42: {
      title: "Chip Variety Snack Box",
      description:
        "Popular choice! 42 count variety box with top brands like Airheads, Cheez It, and Famous Amos. Perfect for families and gatherings.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2Fcd06d6ab52e341e2b57efd6b128aeeaa?format=webp&width=400",
      promotionalText: "Best value for families!",
      orderNowLink:
        "https://www.walmart.com/ip/Gift-a-Snack-Chip-Variety-Snack-Box-Snack-Pack-Variety-Box-42-Count/5298521902?classType=VARIANT&athbdg=L1600",
      viewDetailsButtonText: "View Full Details",
    },
    52: {
      title: "Premium Variety Snack Box",
      description:
        "Customer favorite! 52 count box filled with diverse sweet and salty treats. Beautifully packaged for the perfect gift experience.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F5ff73d8278224c2ab0b862f059e3802c?format=webp&width=400",
      promotionalText: "Customer favorite with best value!",
      orderNowLink:
        "https://www.walmart.com/ip/Gift-a-Snack-52-Count-Snack-Box-with-Variety-Snacks-Chips-Crackers-Cookies-Candy/5915077819?classType=VARIANT&athbdg=L1900",
      viewDetailsButtonText: "View Full Details",
    },
    105: {
      title: "Ultimate Snack Box Collection",
      description:
        "The ultimate experience! 105 count pack with America's favorite candies, chips, crackers, and bars. Perfect for large gatherings and celebrations.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2F936b74c9566f406ebebd96074d052d09?format=webp&width=400",
      promotionalText:
        "America's favorite candies, chips, crackers, and bars included!",
      orderNowLink:
        "https://www.walmart.com/ip/Ultimate-Snack-Box-Variety-Pack-105-Count-by-Gift-A-Snack/14496505954?classType=VARIANT",
      viewDetailsButtonText: "View Full Details",
    },
  },
  footer: {
    logo: "https://cdn.builder.io/api/v1/image/assets%2F79b7dfd5cb0f4ca0b96e836c27c6ef40%2Fcd932fcd18414ba798762d622c2b825c?format=webp&width=240&quality=90",
    description: "Premium snack boxes perfect for gifts and special occasions.",
    quickLinks: [
      { text: "Home", action: "scrollToTop" },
      { text: "Products", action: "scrollToProducts" },
      { text: "Testimonials", action: "scrollToTestimonials" },
      { text: "Why Choose Us", action: "scrollToFeatures" },
    ],
    socialMedia: [
      {
        platform: "TikTok",
        url: "https://tiktok.com/@nut.cravings",
        icon: "tiktok",
      },
      {
        platform: "Instagram",
        url: "#",
        icon: "instagram",
      },
      {
        platform: "Facebook",
        url: "#",
        icon: "facebook",
      },
      {
        platform: "YouTube",
        url: "#",
        icon: "youtube",
      },
    ],
    copyright: "© 2025 Gift A Snack. All rights reserved.",
  },
};

// localStorage key
const ADMIN_DATA_KEY = "gift-a-snack-admin-data";

// Helper functions for data management
export const getAdminData = (): AdminData => {
  try {
    const stored = localStorage.getItem(ADMIN_DATA_KEY);
    if (stored) {
      return { ...defaultAdminData, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.warn("Error loading admin data from localStorage:", error);
  }
  return defaultAdminData;
};

export const saveAdminData = (data: Partial<AdminData>): void => {
  try {
    const currentData = getAdminData();
    const updatedData = { ...currentData, ...data };
    localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(updatedData));
    // Trigger a custom event to notify components of data changes
    window.dispatchEvent(
      new CustomEvent("adminDataUpdated", { detail: updatedData }),
    );
  } catch (error) {
    console.error("Error saving admin data to localStorage:", error);
  }
};

export const resetAdminData = (): void => {
  try {
    localStorage.removeItem(ADMIN_DATA_KEY);
    window.dispatchEvent(
      new CustomEvent("adminDataUpdated", { detail: defaultAdminData }),
    );
  } catch (error) {
    console.error("Error resetting admin data:", error);
  }
};

// Utility function to upload and store images as data URLs temporarily
export const uploadImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("File must be an image"));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      reject(new Error("File size must be less than 5MB"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

// Utility to generate unique IDs
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
