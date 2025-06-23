import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createSupabaseServerClient = () => {
  const cookieStore = cookies(); // <- isso aqui é síncrono e correto

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: async () => {
          // Não implementado (opcional)
        },
        remove: async () => {
          // Não implementado (opcional)
        },
      },
    }
  );
};
