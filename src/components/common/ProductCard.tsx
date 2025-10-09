"use client";

import React from "react";
import Rating from "../ui/Rating";
import Image from "next/image";
import { Product } from "@/types/product.types";
import { useAppDispatch } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/features/carts/cartsSlice";
import { cn } from "@/lib/utils"; // Importando a função cn para classes condicionais

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    // Impede a adição ao carrinho se o item não estiver disponível
    if (!data.available) return;

    const cartItem = {
      id: data.id,
      name: data.title,
      src_url: data.src_url,
      price: data.price,
      discount: data.discount,
      attributes: [],
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <div className="flex flex-col items-start aspect-auto bg-white p-2 rounded-lg shadow-sm mb-5">
      <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden relative">
        <Image
          src={data.src_url}
          width={295}
          height={298}
          className={cn(
            "rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500",
            // 1. Aplica o efeito de tons de cinza se não estiver disponível
            !data.available && "grayscale"
          )}
          alt={data.title}
          priority
        />

        {/* 2. Adiciona um overlay com texto quando o produto não está disponível */}
        {!data.available && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-[13px] lg:rounded-[20px]">
            <span className="text-black font-bold text-base bg-gray-200/80 px-4 py-2 rounded-full">
              Indisponível
            </span>
          </div>
        )}
      </div>

      <strong className="text-black xl:text-xl">{data.title}</strong>

      <div className="flex items-end mb-1 xl:mb-2">
        <Rating
          initialValue={data.rating}
          allowFraction
          SVGclassName="inline-block"
          emptyClassName="fill-gray-50"
          size={19}
          readonly
        />
        <span className="text-black text-xs xl:text-sm ml-[11px] xl:ml-[13px] pb-0.5 xl:pb-0">
          {data.rating.toFixed(1)}
          <span className="text-black/60">/5</span>
        </span>
      </div>

      <div className="flex items-center space-x-[5px] xl:space-x-2.5 mb-1 xl:mb-2">
        {data.discount > 0 ? (
          <span className="font-bold text-black text-xl xl:text-2xl">
            R${Math.round(data.price - (data.price * data.discount) / 100)}
          </span>
        ) : (
          <span className="font-bold text-black text-xl xl:text-2xl">
            R${data.price}
          </span>
        )}

        {data.discount > 0 && (
          <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
            R${data.price}
          </span>
        )}

        {data.discount > 0 && (
          <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
            -{data.discount}%
          </span>
        )}
      </div>

      {/* 3. Desabilita o botão e muda o texto e o estilo */}
      <button
        onClick={handleAddToCart}
        disabled={!data.available}
        className="mt-auto w-full py-2 px-3 rounded-full bg-black text-white font-bold transition
                   hover:bg-gray-800 
                   disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {data.available ? "Adicionar ao carrinho" : "Indisponível"}
      </button>
    </div>
  );
};

export default ProductCard;
