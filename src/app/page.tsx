import HomeClientWrapper from "@/components/HomeClientWrapper";

export const revalidate = 60;

export default async function Home() {
  return <HomeClientWrapper />;
}
