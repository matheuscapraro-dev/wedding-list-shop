// src/components/HomeClientWrapper.tsx
"use client";

import { useState, useEffect } from "react";
import CodeLogin from "@/components/CodeLogin";
import ProductListSec from "./common/ProductListSec";
import Brands from "./homepage/Brands";
import Header from "./homepage/Header";
import { Product } from "@/types/product.types";

interface HomeClientWrapperProps {
  products: Product[];
}

export default function HomeClientWrapper({
  products,
}: HomeClientWrapperProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  if (!user) return <CodeLogin onLogin={setUser} />;

  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec title="Presentes" data={products} viewAllLink="/shop" />
      </main>
    </>
  );
}
