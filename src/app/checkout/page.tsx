"use client";

import { useMemo, useState } from "react"; // O useEffect para o usuário foi removido
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { QrCodePix } from "qrcode-pix";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { clearCart } from "@/lib/features/carts/cartsSlice";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Send, UserX } from "lucide-react";
import { TbBasketCheck } from "react-icons/tb";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();

  // 1. Lendo o estado do carrinho e do usuário diretamente do Redux
  const { cart, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );
  const { user } = useAppSelector((state: RootState) => state.user);

  // 2. Os states locais para o usuário e o useEffect foram removidos
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Gera o payload PIX
  const pixPayload = useMemo(() => {
    if (!adjustedTotalPrice || adjustedTotalPrice <= 0) return "";
    const qrCode = QrCodePix({
      version: "01",
      key: "08402937985", // ❗ Sua chave PIX real aqui
      name: "Matheus Abrahao Capraro", // ❗ Seu nome ou da empresa
      city: "CURITIBA", // ❗ Sua cidade
      transactionId: `TXID${Date.now()}${(Math.random() * 1000).toFixed(0)}`,
      value: adjustedTotalPrice,
    });
    return qrCode.payload();
  }, [adjustedTotalPrice]);

  // Função para copiar o código PIX
  const handleCopy = async () => {
    if (!pixPayload) return;
    await navigator.clipboard.writeText(pixPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Função principal para confirmar o pedido
  const handleConfirmOrder = async () => {
    // A verificação do usuário agora usa o estado reativo do Redux
    if (!user) {
      alert("Erro: usuário não encontrado. Por favor, faça o login novamente.");
      return;
    }
    if (!cart || cart.items.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    setIsSending(true);
    try {
      const productIds = cart.items.map((item) => item.id);
      await Promise.all([
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            totalAmount: adjustedTotalPrice,
            message: message,
            cartItems: cart.items,
            user: user,
          }),
        }),
        fetch("/api/confirm-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productIds }),
        }),
      ]);
      dispatch(clearCart());
      setEmailSent(true);
    } catch (error) {
      console.error("Falha ao confirmar o pedido:", error);
      alert("Ocorreu um erro ao processar seu pedido. Tente novamente.");
    } finally {
      setIsSending(false);
    }
  };

  // 3. Se não houver usuário logado, mostra uma mensagem para fazer login
  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center text-center min-h-[60vh] pb-20 px-4">
        <UserX className="text-6xl text-gray-300 mb-4" />
        <h2
          className={cn([
            integralCF.className,
            "text-3xl font-bold uppercase mb-2",
          ])}
        >
          Acesso Negado
        </h2>
        <p className="max-w-md text-gray-600 mb-6">
          Você precisa estar logado para finalizar a compra.
        </p>
        <Button asChild className="rounded-full">
          <Link href="/">Fazer Login</Link>
        </Button>
      </main>
    );
  }

  // Tela de sucesso
  if (emailSent) {
    return (
      <main className="flex flex-col items-center justify-center text-center min-h-[60vh] pb-20 px-4">
        <TbBasketCheck className="text-6xl text-green-500 mb-4" />
        <h2
          className={cn([
            integralCF.className,
            "text-3xl font-bold uppercase mb-2",
          ])}
        >
          Obrigado, {user.name}!
        </h2>
        <p className="max-w-md text-gray-600 mb-6">
          Sua mensagem foi enviada para os noivos.
        </p>
        <Button asChild className="rounded-full">
          <Link href="/shop">Voltar para a Loja</Link>
        </Button>
      </main>
    );
  }

  // Página de Checkout
  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <h2
          className={cn([
            integralCF.className,
            "font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6 text-center",
          ])}
        >
          Finalizar Compra
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna da Esquerda: Pagamento PIX */}
          <div className="w-full p-6 flex-col space-y-6 rounded-[20px] border border-black/10">
            <h3 className="text-2xl font-bold">1. Pagamento via PIX</h3>
            <div className="flex flex-col items-center gap-4 py-4">
              <p className="text-center text-gray-600">
                Escaneie o QR Code abaixo com o app do seu banco para pagar.
              </p>
              <div className="p-2 bg-white rounded-lg border">
                <QRCodeSVG value={pixPayload} size={200} />
              </div>
              <div className="text-3xl font-bold my-2 text-black">
                R$ {adjustedTotalPrice.toFixed(2).replace(".", ",")}
              </div>
              <Button
                onClick={handleCopy}
                className="flex items-center gap-2 w-full max-w-xs bg-gray-800 hover:bg-gray-900"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copiado!" : "Copiar Código PIX"}
              </Button>
            </div>
          </div>

          {/* Coluna da Direita: Resumo, Mensagem e Confirmação */}
          <div className="w-full p-6 flex-col space-y-5 rounded-[20px] border border-black/10 h-fit">
            <h3 className="text-2xl font-bold">2. Resumo e Mensagem</h3>

            {/* CORREÇÃO DO DESCONTO APLICADA AQUI */}
            {cart?.items.map((item) => {
              const finalPrice =
                item.discount > 0
                  ? item.price - (item.price * item.discount) / 100
                  : item.price;
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <span className="text-gray-700">
                    {item.name} (x{item.quantity})
                  </span>
                  <div className="flex items-baseline space-x-2">
                    {item.discount > 0 && (
                      <span className="text-gray-400 line-through text-sm">
                        R$ {item.price.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                    <span className="font-semibold">
                      R$ {finalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              );
            })}
            <hr />
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>R$ {adjustedTotalPrice.toFixed(2).replace(".", ",")}</span>
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-gray-800">
                Mensagem aos Noivos (opcional)
              </label>
              <Textarea
                placeholder="Deixe aqui sua mensagem de carinho..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-lg text-base"
              />
            </div>

            <Button
              onClick={handleConfirmOrder}
              disabled={isSending}
              className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSending ? "Processando..." : "Enviar e Finalizar"}
              {!isSending && <Send className="ml-2" size={18} />}
            </Button>
            <p className="text-xs text-center text-gray-500">
              Ao clicar, sua mensagem será enviada.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
