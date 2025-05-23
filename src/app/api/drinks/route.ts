import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Listar todas as bebidas (GET)
export async function GET() {
  try {
    const drinks = await prisma.drink.findMany();
    return NextResponse.json(drinks, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar bebidas." },
      { status: 500 },
    );
  }
}

// Criar uma nova bebida (POST)
export async function POST(req: Request) {
  const body = await req.json();
  const { name, description, price, category, wineType, restaurantId } = body;

  try {
    const newDrink = await prisma.drink.create({
      data: {
        name,
        description,
        price,
        category,
        wineType,
        restaurantId,
      },
    });
    return NextResponse.json(newDrink, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao criar bebida." },
      { status: 500 },
    );
  }
}

// Atualizar uma bebida (PUT)
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, name, description, price, category, wineType } = body;

  try {
    const updatedDrink = await prisma.drink.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        description,
        price,
        category,
        wineType,
      },
    });
    return NextResponse.json(updatedDrink, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao atualizar bebida." },
      { status: 500 },
    );
  }
}

// Excluir uma bebida (DELETE)
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    await prisma.drink.delete({
      where: { id: parseInt(id as string, 10) },
    });
    return new Response(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao excluir bebida." },
      { status: 500 },
    );
  }
}
