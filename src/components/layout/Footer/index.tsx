"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import NewsLetterSection from "./NewsLetterSection";
import LayoutSpacing from "./LayoutSpacing";
import { PaymentBadge } from "./footer.types";
import { useAppSelector } from "@/lib/hooks/redux"; // 1. Importar o hook do Redux
import { RootState } from "@/lib/store";

const paymentBadgesData: PaymentBadge[] = [];

const Footer = () => {
  // 2. Ler o usuário diretamente do estado global do Redux
  const { user } = useAppSelector((state: RootState) => state.user);

  // A lógica de useState e useEffect foi removida

  return (
    <footer className="mt-10">
      {/* A seção inteira agora só é renderizada se houver um usuário no Redux */}
      {user && (
        <div className="relative">
          <div className="absolute bottom-0 w-full h-1/2 bg-[#F0F0F0]"></div>
          <div className="px-4">
            {/* 3. Passa o objeto 'user' para o componente filho */}
            <NewsLetterSection user={user} />
          </div>
        </div>
      )}

      <div className="pt-8 md:pt-[50px] bg-[#F0F0F0] px-4 pb-4">
        <div className="max-w-frame mx-auto">
          {/* A linha divisória agora também reage ao estado do usuário */}
          <hr className="h-[1px] border-t-black/10 mb-6" />

          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-2">
            <p className="text-sm text-center sm:text-left text-black/60 mb-4 sm:mb-0 sm:mr-1">
              KESSLER.CAPRARO © Made by{" "}
              <Link
                href="https://github.com/matheuscapraro-dev"
                className="text-black font-medium"
              >
                Matheus Capraro
              </Link>
            </p>
            <div className="flex items-center">
              {/* ...código dos payment badges... */}
            </div>
          </div>
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;
