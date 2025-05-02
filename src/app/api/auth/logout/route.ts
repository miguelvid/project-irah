// typescript
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "admin_session_token";

export async function POST() {
  try {
    const cookieStore = cookies();

    // Remove o cookie que contém o token JWT
    (
      await // Remove o cookie que contém o token JWT
      cookieStore
    ).delete(SESSION_COOKIE_NAME);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no logout:", error);
    return NextResponse.json(
      { error: "Erro ao processar logout." },
      { status: 500 },
    );
  }
}
