// lib/logout.ts
"use client";

import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    toast.error("Erro ao terminar sessão: " + error.message, {
      duration: 6000,
    });
    return;
  }

  toast.success("Sessão encerrada!", { duration: 6000 });
  redirect("/login");
}
