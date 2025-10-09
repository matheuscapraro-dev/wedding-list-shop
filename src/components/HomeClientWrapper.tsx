"use client";

import { Suspense } from "react"; // 1. Importar o Suspense
import { useAppSelector } from "@/lib/hooks/redux";
import CodeLogin from "@/components/CodeLogin";
import Brands from "./homepage/Brands";
import Header from "./homepage/Header";
import { Product } from "@/types/product.types";
import SpinnerbLoader from "@/components/ui/SpinnerbLoader";

interface HomeClientWrapperProps {
  products: Product[];
}

export default function HomeClientWrapper({
  products,
}: HomeClientWrapperProps) {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-96">
            <SpinnerbLoader className="w-10 border-2 border-gray-300 border-r-gray-600" />
          </div>
        }
      >
        <CodeLogin />
      </Suspense>
    );
  }

  return (
    <>
      <Header />
      <Brands />
    </>
  );
}
