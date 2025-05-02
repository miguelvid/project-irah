// src/app/api/menus/route.ts
import { Prisma } from "@prisma/client"; // Importar tipos de erro do Prisma
import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma"; // Importa o singleton do Prisma

// Esquema de validação para criação de menu (POST)
const createMenuSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório." }),
  starter: z.string().optional(),
  starterPrice: z.number().nonnegative().optional(),
  salad: z.string().optional(),
  saladPrice: z.number().nonnegative().optional(),
  mainCourse: z.string().optional(),
  mainCoursePrice: z.number().nonnegative().optional(),
  dessert: z.string().optional(),
  dessertPrice: z.number().nonnegative().optional(),
  totalPrice: z.number().nonnegative().optional(),
  imageUrl: z.string().url({ message: "URL da imagem inválida." }).optional(),
  restaurantId: z.string(), // Assumindo que restaurantId é uma string (UUID ou similar)
});

// Esquema de validação para atualização de menu (PUT)
const updateMenuSchema = z.object({
  id: z.number().int().positive({ message: "ID inválido." }),
  name: z.string().min(1).optional(),
  starter: z.string().optional(),
  starterPrice: z.number().nonnegative().optional(),
  salad: z.string().optional(),
  saladPrice: z.number().nonnegative().optional(),
  mainCourse: z.string().optional(),
  mainCoursePrice: z.number().nonnegative().optional(),
  dessert: z.string().optional(),
  dessertPrice: z.number().nonnegative().optional(),
  totalPrice: z.number().nonnegative().optional(),
  imageUrl: z.string().url().optional(),
});

// Esquema de validação para exclusão de menu (DELETE)
const deleteMenuSchema = z.object({
  id: z.string().regex(/^\d+$/, { message: "ID deve ser um número." }),
});

// Listar todos os menus (GET)
export async function GET() {
  try {
    const menus = await prisma.menu.findMany();
    return NextResponse.json(menus, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar menus:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar menus." },
      { status: 500 },
    );
  }
}

// Criar um novo menu (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createMenuSchema.parse(body);

    const newMenu = await prisma.menu.create({
      data: validatedData,
    });
    return NextResponse.json(newMenu, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos.", details: error.errors },
        { status: 400 },
      );
    }
    // Tratamento para erros conhecidos do Prisma (ex: violação de chave única)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Exemplo: Código P2002 indica violação de constraint única (ex: nome duplicado?)
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Já existe um menu com estes dados (ex: nome)." },
          { status: 409 }, // Conflict
        );
      }
    }
    console.error("Erro ao criar menu:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar menu." },
      { status: 500 },
    );
  }
}

// Atualizar um menu (PUT)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...dataToUpdate } = updateMenuSchema.parse(body);

    const updatedMenu = await prisma.menu.update({
      where: { id },
      data: dataToUpdate,
    });
    return NextResponse.json(updatedMenu, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos.", details: error.errors },
        { status: 400 },
      );
    }
    // Tratamento para erro do Prisma se o menu não for encontrado (P2025)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        {
          error: `Menu com ID ${updateMenuSchema.parse(await req.json()).id} não encontrado.`,
        }, // Re-parse para obter o ID no erro
        { status: 404 }, // Not Found
      );
    }
    console.error("Erro ao atualizar menu:", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar menu." },
      { status: 500 },
    );
  }
}

// Excluir um menu (DELETE)
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const idParam = searchParams.get("id");
  let menuId: number;

  try {
    const { id } = deleteMenuSchema.parse({ id: idParam });
    menuId = parseInt(id, 10);

    await prisma.menu.delete({
      where: { id: menuId },
    });
    return new Response(null, { status: 204 }); // No Content
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "ID inválido.", details: error.errors },
        { status: 400 },
      );
    }
    // Tratamento para erro do Prisma se o menu não for encontrado (P2025)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: `Menu com ID ${menuId!} não encontrado.` }, // Usa o menuId já parseado
        { status: 404 }, // Not Found
      );
    }
    console.error("Erro ao excluir menu:", error);
    return NextResponse.json(
      { error: "Erro interno ao excluir menu." },
      { status: 500 },
    );
  }
}
