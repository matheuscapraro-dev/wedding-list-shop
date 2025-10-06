// src/components/CodeLogin.tsx
"use client";

import { useState } from "react";

interface CodeLoginProps {
  onLogin: (user: any) => void;
}

export default function CodeLogin({ onLogin }: CodeLoginProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      onLogin(data.user);
    } catch (err) {
      setError("Erro desconhecido");
    }
  };

  return (
    <div className="flex flex-col space-y-2 max-w-sm mx-auto">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Digite seu código"
        className="border rounded px-3 py-2"
      />
      <button
        onClick={handleLogin}
        className="bg-black text-white rounded py-2"
      >
        Entrar
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
