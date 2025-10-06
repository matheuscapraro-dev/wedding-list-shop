"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function PixCheckoutModal() {
  const [pixKey, setPixKey] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // gera uma chave PIX aleatória simulada
    const randomKey = `pix-${Math.random()
      .toString(36)
      .substring(2, 12)}@email.com`;
    setPixKey(randomKey);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="text-sm md:text-base font-medium bg-black rounded-full w-full py-4 h-[54px] md:h-[60px] group"
        >
          Go to Checkout
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm p-6 text-center">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Pagamento via PIX
          </DialogTitle>
          <DialogDescription>
            Escaneie o QR Code ou copie o código abaixo para pagar.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <QRCodeSVG value={pixKey} size={180} />
          <div className="w-full bg-muted rounded-lg p-3 text-sm font-mono break-all text-center">
            {pixKey}
          </div>

          <Button
            onClick={handleCopy}
            className="flex items-center gap-2 w-full bg-black hover:bg-black/90"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copiado!" : "Copiar código PIX"}
          </Button>

          <Button
            onClick={async () => {
              await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pixKey }),
              });
              alert("E-mail enviado com sucesso!");
            }}
            className="flex items-center gap-2 w-full bg-blue-600 hover:bg-blue-700"
          >
            Enviar e-mail
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
