"use client";

import React, { useMemo } from "react";
import Rating from "../ui/Rating";
import Image from "next/image";
import Link from "next/link"; // 1. Importar o Link
import { Product } from "@/types/product.types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux"; // 2. Importar useAppSelector
import { RootState } from "@/lib/store";
import { addToCart } from "@/lib/features/carts/cartsSlice";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button"; // Importar o Button para usar com o Link

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  // 3. Acessar o estado do carrinho
  const { cart } = useAppSelector((state: RootState) => state.carts);

  // 4. Verificar se este produto específico já está no carrinho
  // useMemo otimiza a verificação para que ela só rode quando o carrinho mudar
  const isInCart = useMemo(() => {
    if (!cart?.items) return false;
    return cart.items.some((item) => item.id === data.id);
  }, [cart, data.id]);

  const handleAddToCart = () => {
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
    <div className="flex flex-col items-start aspect-auto bg-white p-2 rounded-lg shadow-sm mb-5 h-full">
      {/* Imagem e Overlay */}
      <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full aspect-square mb-2.5 xl:mb-4 overflow-hidden relative">
        <Image
          src={data.src_url}
          width={295}
          height={298}
          className={cn(
            "rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500",
            !data.available && "grayscale"
          )}
          alt={data.title}
          priority
        />
        {!data.available && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-[13px] lg:rounded-[20px]">
            <span className="text-black font-bold text-base bg-gray-200/80 px-4 py-2 rounded-full">
              Indisponível
            </span>
          </div>
        )}
      </div>

      {/* Título, Rating e Preço */}
      <strong className="text-black xl:text-xl">{data.title}</strong>
      <div className="flex items-end mb-1 xl:mb-2">
        {" "}
        <Rating
          initialValue={data.rating}
          allowFraction
          SVGclassName="inline-block"
          emptyClassName="fill-gray-50"
          size={19}
          readonly
        />{" "}
        <span className="text-black text-xs xl:text-sm ml-[11px] xl:ml-[13px] pb-0.5 xl:pb-0">
          {data.rating.toFixed(1)}
          <span className="text-black/60">/5</span> {" "}
        </span>{" "}
      </div>
      <div className="flex items-center space-x-[5px] xl:space-x-2.5 mb-1 xl:mb-2">
        {data.discount > 0 ? (
          <span className="font-bold text-black text-xl xl:text-2xl">
            R$
            {Math.round(data.price - (data.price * data.discount) / 100)} {" "}
          </span>
        ) : (
          <span className="font-bold text-black text-xl xl:text-2xl">
            R${data.price}{" "}
          </span>
        )}{" "}
        {data.discount > 0 && (
          <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
            R${data.price}{" "}
          </span>
        )}{" "}
        {data.discount > 0 && (
          <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
            -{data.discount}%{" "}
          </span>
        )}
      </div>

      {/* 5. Lógica condicional para o botão */}
      <div className="mt-auto w-full pt-2">
        {!data.available ? (
          <Button
            disabled
            className="w-full py-2 px-3 rounded-full bg-gray-300 text-gray-500 cursor-not-allowed"
          >
            Indisponível
          </Button>
        ) : isInCart ? (
          <Button
            asChild
            className="w-full py-2 px-3 rounded-full bg-green-600 text-white font-bold transition hover:bg-green-700"
          >
            <Link href="/cart">Ver no Carrinho</Link>
          </Button>
        ) : (
          <Button
            onClick={handleAddToCart}
            className="w-full py-2 px-3 rounded-full bg-black text-white font-bold transition hover:bg-gray-800"
          >
            Adicionar ao carrinho
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
