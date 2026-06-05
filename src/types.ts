export interface VideoScene {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  poster: string;
  heading: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}
