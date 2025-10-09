import HomeClientWrapper from "@/components/HomeClientWrapper";
import { getProducts } from "@/lib/products";

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();

  return <HomeClientWrapper products={products} />;
}
