// src/app/api/auth/logout/route.ts
import { deleteCookie } from "cookies-next";
import { NextResponse } from "next/server";

// Mesmo nome de cookie usado no login
const SESSION_COOKIE_NAME = "admin_session_token";

export async function POST(req: Request) {
  try {
    const response = NextResponse.json({ success: true });

    // Remove o cookie que contém o token JWT
    deleteCookie(SESSION_COOKIE_NAME, {
      req,
      res: response,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Erro no logout:", error);
    return NextResponse.json(
      { error: "Erro ao processar logout." },
      { status: 500 },
    );
  }
}
