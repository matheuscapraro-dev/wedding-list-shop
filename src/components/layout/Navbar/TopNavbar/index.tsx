"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react"; // useState e useEffect removidos
import Image from "next/image";
import CartBtn from "./CartBtn";
import { useAppSelector } from "@/lib/hooks/redux"; // 1. Importar o hook do Redux
import { RootState } from "@/lib/store";

// O objeto 'data' com o menu foi omitido para encurtar, ele continua o mesmo.

export default function TopNavbar() {
  // 2. A lógica de useState e useEffect para o usuário foi removida.

  // 3. O usuário agora é lido diretamente do estado global do Redux.
  const { user } = useAppSelector((state: RootState) => state.user);

  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-xl lg:text-[32px] mb-2 mr-3 lg:mr-10",
            ])}
          >
            KESSLER.CAPRARO
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {" "}
          {/* Adicionado um espaçamento para alinhar melhor */}
          <CartBtn />
          {/* A lógica JSX agora usa o 'user' do Redux e é reativa */}
          {user ? (
            <div className="relative group">
              <Image
                priority
                src="/icons/user.svg"
                height={24}
                width={24}
                alt="user"
                className="cursor-pointer" // Adicionado cursor
              />
              <span className="absolute right-0 top-full mt-2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
                {user.name}
              </span>
            </div>
          ) : (
            <Link href="/" className="p-1">
              {" "}
              {/* Link para a home para fazer login */}
              <Image
                priority
                src="/icons/user.svg"
                height={24}
                width={24}
                alt="user"
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
