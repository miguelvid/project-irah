// src/middleware.ts
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "admin_session_token"; // Mesmo nome do cookie usado no login
const JWT_SECRET = process.env.JWT_SECRET; // Segredo para verificar o JWT

export async function middleware(request: NextRequest) {
  // Verifica se a rota acessada começa com /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!JWT_SECRET) {
      console.error("JWT_SECRET não está configurado no ambiente.");
      // Em um cenário real, você pode querer retornar uma página de erro genérica
      // ou redirecionar para um status de erro, mas evite expor detalhes internos.
      return new NextResponse("Erro de configuração interna.", { status: 500 });
    }

    // Obtém o token JWT do cookie
    const token = getCookie(SESSION_COOKIE_NAME, { req: request });

    let isTokenValid = false;
    if (token) {
      try {
        // Verifica se o token é válido e não expirou
        jwt.verify(token, JWT_SECRET);
        isTokenValid = true;
      } catch (error) {
        // Token inválido ou expirado
        console.log("Erro ao verificar JWT no middleware:", error);
        isTokenValid = false;
      }
    }

    // Se o token não for válido, redireciona para uma página de login
    // (ou para a raiz, assumindo que a página raiz lida com o login se não autenticado)
    if (!isTokenValid) {
      const loginUrl = new URL("/", request.url); // Redireciona para a raiz
      // Limpa o cookie inválido/expirado antes de redirecionar
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }
  }

  // Permite que a requisição continue se não for rota /admin ou se o token for válido
  return NextResponse.next();
}

// Define quais rotas o middleware deve interceptar
export const config = {
  // Aplica a todas as rotas dentro de /admin, exceto as rotas da API de autenticação
  // para evitar loops de redirecionamento ou bloqueio do login/logout.
  matcher: ["/admin/:path*"],
};
