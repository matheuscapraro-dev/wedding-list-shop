"use client"; // ⚠️ necessário para interatividade (carrinho)

import React, { useState } from "react";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import ProductCard from "@/components/common/ProductCard";
import { getProducts } from "@/lib/products";
import { Product } from "@/types/product.types";

interface ShopPageProps {
  products: Product[];
}

export default function ShopPage({ products }: ShopPageProps) {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    if (!cart.find((p) => p.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />

        <h1 className="font-bold text-2xl md:text-[32px] mb-5">Presentes</h1>

        {/* Produtos */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>

        {/* Carrinho simples */}
        {cart.length > 0 && (
          <div className="mt-10 border-t pt-5">
            <h2 className="font-bold text-xl mb-3">Seu carrinho</h2>
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.title}</span>
                  <span>
                    R$
                    {item.discount > 0
                      ? item.price - (item.price * item.discount) / 100
                      : item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
