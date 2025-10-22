import ShopPageClient from "./ShopPageClient";

export const revalidate = 60;

export default async function Page() {
  return <ShopPageClient />;
}
