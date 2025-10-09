"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks/redux";
import { setUser } from "@/lib/features/user/userSlice";

type User = {
  id: number;
  name: string;
  confirmed: boolean;
};

type NewsLetterSectionProps = {
  user: User;
};

const NewsLetterSection = ({ user }: NewsLetterSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const isConfirmed = user.confirmed || false;

  const handleConfirm = async () => {
    if (user.confirmed || isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/confirm-presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        throw new Error("Falha ao confirmar presença.");
      }

      const updatedUser = { ...user, confirmed: true };
      dispatch(setUser(updatedUser));
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 items-center py-9 md:py-11 px-6 md:px-16 max-w-frame mx-auto bg-black rounded-[20px]">
      <p
        className={cn([
          integralCF.className,
          "font-bold text-[32px] md:text-[40px] text-white text-center md:text-left mb-9 md:mb-0",
        ])}
      >
        {isConfirmed ? "Presença Confirmada!" : "Confirme sua Presença"}
      </p>
      {isConfirmed ? (
        <div className="flex items-center justify-center">
          <span className="flex items-center gap-2 text-white bg-green-500 font-medium h-12 rounded-full px-6 py-3">
            <CheckCircle size={20} />
            Confirmado
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {/* 👇 AS CLASSES DE ESTILO FORAM RESTAURADAS AQUI 👇 */}
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            variant="secondary"
            className="text-sm sm:text-base font-medium bg-white h-12 rounded-full px-4 py-3 
                       w-full max-w-[349px] text-black
                       disabled:bg-gray-300 disabled:cursor-wait"
            type="button"
          >
            {isLoading ? "Confirmando..." : "Confirmar"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewsLetterSection;
