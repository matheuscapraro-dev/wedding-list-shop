// src/app/api/confirm-presence/route.ts

import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "ID do usuário é obrigatório." },
        { status: 400 }
      );
    }

    // Atualiza a coluna 'confirmed' para 'true' no usuário específico
    const { error } = await supabase
      .from("users")
      .update({ confirmed: true })
      .eq("id", userId); // .eq() encontra a linha onde o 'id' corresponde

    if (error) {
      console.error("Erro no Supabase ao confirmar presença:", error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Presença confirmada com sucesso.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro ao confirmar presença." },
      { status: 500 }
    );
  }
}
