// src/components/CodeLogin.tsx

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks/redux";
import { setUser } from "@/lib/features/user/userSlice";

export default function CodeLogin() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleLogin = async (loginCode: string) => {
    if (!loginCode) return;

    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ code: loginCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setIsLoading(false); // Para o loading em caso de erro
        return;
      }

      dispatch(setUser(data.user));

      // Limpa a URL para remover o parâmetro ?code=... após o login
      router.replace("/");
    } catch (err) {
      setError("Erro desconhecido");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const codeFromUrl = searchParams.get("code");
    if (codeFromUrl) {
      setCode(codeFromUrl.toUpperCase());
      handleLogin(codeFromUrl.toUpperCase());
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-4 min-h-[200px]">
        <h2 className="text-2xl font-bold text-center mb-4">Autenticando...</h2>
        <p className="text-center text-gray-600">Aguarde um momento.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 max-w-sm mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        Acessar minha conta
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Digite o código único que você recebeu.
      </p>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="Digite seu código"
        className="border rounded px-3 py-2 text-center"
      />
      <button
        onClick={() => handleLogin(code)}
        className="bg-black text-white rounded py-2 hover:bg-gray-800 transition-colors"
      >
        Entrar
      </button>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
}
