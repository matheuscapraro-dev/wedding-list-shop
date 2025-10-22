import { supabase } from "./supabase";

export async function getProducts(group: number = 1) {
  if (group < 4) group = 1;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .filter("group", "=", group)
    .order("id");

  if (error) {
    console.error("Erro ao buscar produtos:", error.message);
    return [];
  }

  return data;
}
