import { getProducts } from "@/lib/products";
import ShopPageClient from "./ShopPageClient";

export const revalidate = 60;

export default async function Page() {
  const products = await getProducts();
  return <ShopPageClient products={products} />;
}
