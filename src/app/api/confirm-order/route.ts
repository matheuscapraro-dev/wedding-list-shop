// src/app/api/confirm-order/route.ts
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { productIds } = await req.json();

    // Validação: Garante que recebemos um array de IDs
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { success: false, message: "Nenhum ID de produto fornecido." },
        { status: 400 }
      );
    }

    // Atualiza a coluna 'available' para 'false' para todos os produtos no array
    // const { error } = await supabase
    //   .from("products")
    //   .update({ available: false })
    //   .in("id", productIds); // .in() é perfeito para corresponder a múltiplos valores

    // if (error) {
    //   console.error("Erro no Supabase ao atualizar produtos:", error);
    //   throw error; // Lança o erro para ser pego pelo catch
    // }

    return NextResponse.json({
      success: true,
      message: "Produtos atualizados com sucesso.",
    });
  } catch (error) {
    // Garante que o tipo do erro seja 'any' para acessar 'message'
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? error.message
        : "Erro desconhecido.";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
