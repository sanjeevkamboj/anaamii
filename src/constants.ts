import { VideoScene, NavigationItem, FurnitureItem } from "./types";

export const VIDEO_SCENES: VideoScene[] = [
  {
    id: "axo-dining",
    title: "Axo Dining Series",
    subtitle: "Explore statement pieces for the dining room",
    heading: "Dining room designs that bring people together",
    url: "https://cdn.static.amplience.net/boconcept/_vid/5706ac72-5bde-48a4-b736-b3db00c618b6/ba77d213-595b-4970-b645-cbef4c9009ed/video/8cd37b20-81d9-4339-90df-6634277a621a.mp4",
    poster: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: "nordic-kitchen",
    title: "Nordic Atelier Kitchen",
    subtitle: "Sleek textures and custom architectural wood millwork",
    heading: "Bespoke culinary spaces designed for conversations",
    url: "https://www.pexels.com/download/video/7578552/",
    poster: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: "scandinavian-lounge",
    title: "Skagen Lounge and Chairs",
    subtitle: "Elegant comfort tailored for modern architecture",
    heading: "Handcrafted furniture echoing the winds of Skagen",
    url: "https://pixabay.com/videos/download/video-127112_medium.mp4",
    poster: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80"
  }
];

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

export const FURNITURE_ITEMS: FurnitureItem[] = [
  {
    id: "1",
    name: "Axo Bespoke Dining Table",
    category: "Dining Tables",
    price: "From $2,895",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    description: "Solid matte oak table with custom black steel minimalist legs."
  },
  {
    id: "2",
    name: "Imola Lounge Chair",
    category: "Lounge Chairs",
    price: "$3,450",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
    description: "Danish luxury design, sculpted for complete relaxation."
  },
  {
    id: "3",
    name: "Princeton Dining Chair",
    category: "Dining Chairs",
    price: "From $580",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    description: "Elegant curves with customizable textile and slender metal frames."
  },
  {
    id: "4",
    name: "Como Wall System",
    category: "Storage & Millwork",
    price: "$4,200",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    description: "Modular wall modules that organize and express your personal gallery."
  },
  {
    id: "5",
    name: "Lugano Sideboard",
    category: "Sideboards",
    price: "$1,995",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
    description: "Low-profile aesthetic with walnut veneer doors and ample luxury storage."
  },
  {
    id: "6",
    name: "Outrigger Pendant Light",
    category: "Lighting",
    price: "$850",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    description: "Brushed brass sculptural pendant radiating warm and structured ambiance."
  }
];
