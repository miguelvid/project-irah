import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

// Variáveis de ambiente SERVER-SIDE
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;
const SESSION_COOKIE_NAME = "admin_session_token";

// Esquema de validação para o corpo do login
const loginSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres." }),
});

export async function POST(req: Request) {
  if (!ADMIN_PASSWORD_HASH || !JWT_SECRET) {
    console.error(
      "ADMIN_PASSWORD_HASH ou JWT_SECRET não estão configurados no ambiente.",
    );
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }

  try {
    const body = await req.json();

    // Valida o corpo da requisição usando Zod
    const validatedData = loginSchema.parse(body);
    const { password } = validatedData;

    // Compara a senha fornecida com o hash armazenado
    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (isPasswordValid) {
      // Login bem-sucedido: Gera um token JWT
      const tokenPayload = { userId: "admin" };
      const token = jwt.sign(tokenPayload, JWT_SECRET, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({ success: true });

      // Define o cookie com o token JWT usando a API nativa do Next.js
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      });

      return response;
    } else {
      // Senha incorreta
      return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
    }
  } catch (error) {
    // Se for um erro de validação do Zod, retorna 400
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos.", details: error.errors },
        { status: 400 },
      );
    }
    // Verifica se o erro é de JSON inválido
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Formato de requisição inválido." },
        { status: 400 },
      );
    }
    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: "Erro ao processar login." },
      { status: 500 },
    );
  }
}
