"use client";

import { useState, useMemo } from "react";
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
import { QrCodePix } from "qrcode-pix";

interface PixCheckoutModalProps {
  totalAmount: number;
}

export default function PixCheckoutModal({
  totalAmount,
}: PixCheckoutModalProps) {
  const [copied, setCopied] = useState(false);

  const pixPayload = useMemo(() => {
    const qrCode = QrCodePix({
      version: "01",
      key: "08402937985",
      name: "Matheus Abrahao Caprarop",
      city: "Curitiba",
      transactionId: `TXID${Date.now()}${(Math.random() * 1000).toFixed(0)}`,
      value: totalAmount,
    });

    return qrCode.payload();
  }, [totalAmount]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pixPayload);
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
          <QRCodeSVG value={pixPayload} size={180} />

          <div className="w-full bg-muted rounded-lg p-3 text-xs font-mono break-all text-center">
            <div className="text-3xl font-bold my-2 text-black">
              R$ {totalAmount.toFixed(2).replace(".", ",")}
            </div>
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
                body: JSON.stringify({ pixPayload, totalAmount }),
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
