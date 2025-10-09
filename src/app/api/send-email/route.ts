// /api/send-email/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

export async function POST(req: Request) {
  try {
    // 1. Receber o objeto 'user' junto com os outros dados
    const { totalAmount, message, cartItems, user } = await req.json();

    // Validação
    if (!user || !totalAmount || !cartItems) {
      return NextResponse.json(
        { success: false, message: "Dados ausentes." },
        { status: 400 }
      );
    }

    const itemsHtml = cartItems
      .map(
        (item: any) =>
          `<li>${item.name} (x${item.quantity}) - R$ ${item.price
            .toFixed(2)
            .replace(".", ",")}</li>`
      )
      .join("");

    // 2. Adicionar o nome do usuário ao corpo do e-mail
    const emailHtml = `
      <div>
        <h1>🎉 Novo Presente de Casamento!</h1>
        <p>
          <strong>De:</strong> ${user.name}
        </p>
        <hr>
        <h2><strong>Mensagem do Convidado:</strong></h2>
        <p style="font-style: italic; background-color: #f5f5f5; padding: 10px; border-radius: 5px;">
          ${message ? `"${message}"` : "<i>Nenhuma mensagem foi deixada.</i>"}
        </p>
        <hr>
        <h3><strong>Detalhes do Presente:</strong></h3>
        <ul>
          ${itemsHtml}
        </ul>
        <h3><strong>Valor Total: R$ ${totalAmount
          .toFixed(2)
          .replace(".", ",")}</strong></h3>
        <hr>
        <p>Lembre-se de confirmar o recebimento do PIX para validar a compra.</p>
      </div>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: "matheuscapraro@gmail.com",
      subject: `🎁 Presente de ${user.name}!`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao enviar o e-mail." },
      { status: 500 }
    );
  }
}
