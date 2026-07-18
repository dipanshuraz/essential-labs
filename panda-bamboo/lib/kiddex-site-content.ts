/** Site-wide static copy (blog, about, contact, etc.). */

export const MARQUEE_ITEMS = [
  "Toy Car",
  "Girls Doll",
  "Balloons",
  "Color Plate",
  "Puzzles",
  "Cubes",
] as const;

export const ABOUT_STATS = [
  { count: 25, label: "Retails Store in the city" },
  { count: 300, label: "Active Delivery Person" },
  { count: 120, label: "Brands and Companies" },
] as const;

export const BRANDS_STYLE_TWO = [
  { img: "brands/brands-7.png", sale: "25% off" },
  { img: "brands/brands-8.png", sale: "20% off" },
  { img: "brands/brands-9.png", sale: "10% off" },
  { img: "brands/brands-10.png", sale: "15% off" },
  { img: "brands/brands-11.png", sale: "25% off" },
  { img: "brands/brands-12.png", sale: "10% off" },
  { img: "brands/brands-13.png", sale: "15% off" },
  { img: "brands/brands-14.png", sale: "20% off" },
  { img: "brands/brands-15.png", sale: "10% off" },
  { img: "brands/brands-16.png", sale: "25% off" },
  { img: "brands/brands-17.png", sale: "15% off" },
  { img: "brands/brands-18.png", sale: "20% off" },
] as const;

export type AboutTestimonial = {
  name: string;
  date: string;
  rating: string;
  text: string;
  thumb: string;
  productTitle: string;
  price: string;
};

export const ABOUT_TESTIMONIALS: AboutTestimonial[] = [
  {
    name: "Kenneth R. Myers",
    date: "June 3, 2024",
    rating: "(5)",
    text: "I absolutely love this baby shop! The staff is incredibly helpful, and the selection is fantastic. I found everything I needed for my newborn, from adorable outfits to essential gear.",
    thumb: "resource/testimonial-1.png",
    productTitle: "Creation Rotating and Musical Doll with 3D",
    price: "$83.99",
  },
  {
    name: "James W. Myers",
    date: "June 12, 2024",
    rating: "(4)",
    text: "Shopping here has been a delightful experience. The quality of the products is top-notch, and the prices are reasonable. We especially appreciate the wide range of eco-friendly",
    thumb: "resource/testimonial-2.png",
    productTitle: "Creation Rotating and Musical Doll with 3D",
    price: "$32.99",
  },
  {
    name: "James W. Myers",
    date: "June 31, 2024",
    rating: "(4.7)",
    text: "This baby shop has been a lifesaver! As a first-time mom, I was overwhelmed, but the knowledgeable staff guided me through every purchase. The customer service is exceptional.",
    thumb: "resource/testimonial-3.png",
    productTitle: "Creation Rotating and Musical Doll with 3D",
    price: "$83.99",
  },
  {
    name: "Kenneth R. Myers",
    date: "June 23, 2024",
    rating: "(5)",
    text: "I absolutely love this baby shop! The staff is incredibly helpful, and the selection is fantastic. I found everything I needed for my newborn, from adorable outfits to essential gear.",
    thumb: "resource/testimonial-4.png",
    productTitle: "Creation Rotating and Musical Doll with 3D",
    price: "$16.99",
  },
  {
    name: "Kenneth R. Myers",
    date: "June 16, 2024",
    rating: "(4.9)",
    text: "I absolutely love this baby shop! The staff is incredibly helpful, and the selection is fantastic. I found everything I needed for my newborn, from adorable outfits to essential gear.",
    thumb: "resource/testimonial-5.png",
    productTitle: "Creation Rotating and Musical Doll with 3D",
    price: "$83.99",
  },
];

export const HIGHLIGHTS_STRIP = [
  { icon: "icons/icon-2.png", title: "Same day Product Delivery" },
  { icon: "icons/icon-3.png", title: "100% Customer Satisfaction" },
  { icon: "icons/icon-4.png", title: "Help and access is our mission" },
  { icon: "icons/icon-5.png", title: "100% quality Toy Accessories" },
  { icon: "icons/icon-6.png", title: "24/7 Support for Clients" },
] as const;

export type NewsCard = {
  image: string;
  date: string;
  author: string;
  title: string;
  wowDelay?: string;
};

export const ABOUT_NEWS: NewsCard[] = [
  {
    image: "news/news-1.png",
    date: "June 4, 2024",
    author: "Jeams",
    title: "Dressing Your Little One Stylish and Comfortable Baby Outfits",
    wowDelay: "00ms",
  },
  {
    image: "news/news-2.png",
    date: "June 3, 2024",
    author: "Jeams",
    title: "Baby Gear Essentials What You Really Need",
    wowDelay: "200ms",
  },
  {
    image: "news/news-3.png",
    date: "June 2, 2024",
    author: "Jeams",
    title: "Babyproofing Your Home A Comprehensive Guide",
    wowDelay: "400ms",
  },
  {
    image: "news/news-4.png",
    date: "June 1, 2024",
    author: "Jeams",
    title: "How to Choose the Perfect Crib for Your Baby",
    wowDelay: "600ms",
  },
];

export type BlogPost = NewsCard & { headingLevel?: "h2" | "h3" };

export const BLOG_GRID_POSTS: BlogPost[] = [
  {
    image: "news/news-1.png",
    date: "June 9, 2024",
    author: "Jeams",
    title: "Dressing Your Little One Stylish and Comfortable Baby Outfits",
  },
  {
    image: "news/news-2.png",
    date: "June 8, 2024",
    author: "Jeams",
    title: "Baby Gear Essentials What You Really Need",
  },
  {
    image: "news/news-3.png",
    date: "June 7, 2024",
    author: "Jeams",
    title: "Babyproofing Your Home A Comprehensive Guide",
  },
  {
    image: "news/news-4.png",
    date: "June 6, 2024",
    author: "Jeams",
    title: "How to Choose the Perfect Crib for Your Baby",
  },
  {
    image: "news/news-8.png",
    date: "June 5, 2024",
    author: "Jeams",
    title: "Lessons and insights from 8 years of Pixelgrade",
  },
  {
    image: "news/news-9.png",
    date: "June 4, 2024",
    author: "Alex",
    title: "How to choose the right colors when creating a website?",
  },
  {
    image: "news/news-10.png",
    date: "June 3, 2024",
    author: "Matina",
    title: "How does writing influence your personal brand?",
  },
  {
    image: "news/news-11.png",
    date: "June 2, 2024",
    author: "Matina",
    title: "How to design your site footer like we did",
  },
  {
    image: "news/news-12.png",
    date: "June 1, 2024",
    author: "Alex",
    title: "The unseen of spending three years at Pixelgrade",
  },
  {
    image: "news/news-13.png",
    date: "June 6, 2024",
    author: "Jeams",
    title: "How to choose the right customer for your photo business?",
  },
  {
    image: "news/news-14.png",
    date: "June 5, 2024",
    author: "Jeams",
    title: "How a visual artist redefines success in graphic design",
  },
  {
    image: "news/news-15.png",
    date: "June 4, 2024",
    author: "Alex",
    title: "Start a blog to reach your creative peak",
  },
  {
    image: "news/news-16.png",
    date: "June 3, 2024",
    author: "Matina",
    title: "Starting your traveling blog with Vasco",
  },
];

export const BLOG_STANDARD_POSTS: BlogPost[] = [
  {
    image: "news/news-19.png",
    date: "June 11, 2024",
    author: "Admin",
    title: "The Charity Shield - More than just a trial",
    headingLevel: "h2",
  },
  {
    image: "news/news-20.png",
    date: "June 10, 2024",
    author: "Admin",
    title: "Why choose a theme that looks good with WooCommerce",
    headingLevel: "h2",
  },
  {
    image: "news/news-21.png",
    date: "June 9, 2024",
    author: "Admin",
    title: "How to optimize images in WordPress for faster loading",
    headingLevel: "h2",
  },
  {
    image: "news/news-22.png",
    date: "June 8, 2024",
    author: "Admin",
    title: "The unseen of spending three years at Pixelgrade",
    headingLevel: "h2",
  },
  {
    image: "news/news-23.png",
    date: "June 7, 2024",
    author: "Admin",
    title: "How to design your site footer like we did",
    headingLevel: "h2",
  },
];

export const CONTACT_INFO = [
  {
    icon: "icons/icon-17.png",
    title: "Corporate Office",
    lines: ["0233 Brisbane Cir. Shiloh, Australia 81063"],
  },
  {
    icon: "icons/icon-18.png",
    title: "Main Warehouse",
    lines: ["0233 Brisbane Cir. Shiloh, Australia 81063"],
  },
  {
    icon: "icons/icon-19.png",
    title: "Email Address",
    lines: ["contact@example.com", "support@example.com"],
    mailto: true,
  },
  {
    icon: "icons/icon-20.png",
    title: "Phone Number",
    lines: ["Emergency Cases", "+(208) 544 -0142", "+(208) 544 -0143"],
    phoneIndex: 1,
  },
] as const;

export const BLOG_CATEGORIES = [
  "Kids Gaming",
  "Puzzle Contest",
  "Child Care",
  "Indoor Games for Kids",
  "Outdoor Games for Kids",
  "Wheels And Rings",
  "Lighting Games",
  "Vehicle for Babies",
] as const;
