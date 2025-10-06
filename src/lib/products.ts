import { supabase } from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id");

  if (error) {
    console.error("Erro ao buscar produtos:", error.message);
    return [];
  }

  return data;
}
