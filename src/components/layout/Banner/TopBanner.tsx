"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react"; // O useEffect foi removido
import { useAppSelector } from "@/lib/hooks/redux"; // 1. Importar o hook do Redux
import { RootState } from "@/lib/store";

export default function TopBanner() {
  // 2. A lógica de useState e useEffect para o usuário foi removida
  const { user } = useAppSelector((state: RootState) => state.user);
  const [show, setShow] = useState(true);

  if (!show) return null; // Permite fechar o banner

  return (
    <div className="bg-black text-white text-center py-2 px-2 sm:px-4 xl:px-0">
      <div className="relative max-w-frame mx-auto">
        {/* 3. A mensagem agora usa o 'user' do Redux e se atualiza automaticamente */}
        <p className="text-xs sm:text-sm">
          {user
            ? `Bem-vindo(a), ${user.name}! Escolha um presente para o casamento de Matheus & Alessandra.`
            : "Bem-vindo(a)! Faça login para ver os presentes disponíveis."}
        </p>
        <Button
          variant="ghost"
          className="hover:bg-transparent absolute right-0 top-1/2 -translate-y-1/2 w-fit h-fit p-1 hidden sm:flex"
          size="icon"
          type="button"
          aria-label="close banner"
          onClick={() => setShow(false)}
        >
          <Image
            priority
            src="/icons/times.svg"
            height={13}
            width={13}
            alt="close banner"
          />
        </Button>
      </div>
    </div>
  );
}
