import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const groupParam = searchParams.get("group") ?? "1";
    const group = Number(groupParam) || 1;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("group", group);

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("API /api/products error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
