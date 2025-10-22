"use client";

import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/lib/hooks/redux";
import { Product } from "@/types/product.types";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/common/ProductCard";

const shuffleArray = (arr: Product[]) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

export default function ShopPageClient() {
  const { user } = useAppSelector((state) => state.user);
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState("random");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/products?group=${user.group}`, {
          cache: "no-store",
        });
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  const sortedProducts = React.useMemo(() => {
    const available = products.filter((p) => p.available);
    const unavailable = products.filter((p) => !p.available);

    let sorted = [...available];
    if (sort === "low-price") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "high-price") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "random") sorted = shuffleArray(available);

    return [...sorted, ...unavailable];
  }, [sort, products]);

  if (loading) {
    return (
      <main className="pb-20">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <p className="text-center text-black/60 mt-10">
            Carregando produtos...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />

        <div className="flex md:space-x-5 items-start">
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl md:text-[32px]">Presentes</h1>
              </div>

              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Mostrando {sortedProducts.length} Produtos
                </span>

                <div className="flex items-center">
                  Ordenar por:{" "}
                  <Select value={sort} onValueChange={(v) => setSort(v)}>
                    <SelectTrigger className="ml-2 w-36 sm:w-44 h-10 px-1 text-sm sm:text-base font-medium text-black border-0 shadow-none focus:outline-none focus:ring-0">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="random">Aleatório</SelectItem>
                      <SelectItem value="low-price">Mais barato</SelectItem>
                      <SelectItem value="high-price">Mais caro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
