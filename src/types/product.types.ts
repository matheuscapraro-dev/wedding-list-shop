export type Product = {
  id: number;
  title: string;
  src_url: string;
  gallery?: string[];
  price: number;
  discount: number;
  rating: number;
  available: boolean;
};
