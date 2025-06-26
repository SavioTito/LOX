// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const pathname = request.nextUrl.pathname;

  // Rotas que não requerem autenticação
  const publicPaths = ["/login", "/signup", "/about"];
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return response;
  }

  // Verificar autenticação para rotas protegidas
  if (pathname.startsWith("/participant") || pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Verificar role do usuário
    const { data: user } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    // Bloquear acesso não-admin à área administrativa
    if (pathname.startsWith("/admin") && user?.role !== "admin") {
      return NextResponse.redirect(new URL("/portal", request.url));
    }
  }

  return response;
}
