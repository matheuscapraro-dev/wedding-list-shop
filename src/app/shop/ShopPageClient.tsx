"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types/product.types";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiSliders } from "react-icons/fi";
import ProductCard from "@/components/common/ProductCard";

type ShopPageClientProps = {
  products: Product[];
};

export default function ShopPageClient({
  products: initialProducts,
}: ShopPageClientProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState("random");

  const shuffleArray = (arr: Product[]) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    let sorted = [...initialProducts];

    if (sort === "low-price") sorted = sorted.sort((a, b) => a.price - b.price);
    else if (sort === "high-price")
      sorted = sorted.sort((a, b) => b.price - a.price);
    else if (sort === "random") sorted = shuffleArray(initialProducts);

    setProducts(sorted);
  }, [sort, initialProducts]);

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">Filters</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
          </div>

          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl md:text-[32px]">Presentes</h1>
              </div>

              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing {products.length} Products
                </span>

                <div className="flex items-center">
                  Sort by:{" "}
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
              {products.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
