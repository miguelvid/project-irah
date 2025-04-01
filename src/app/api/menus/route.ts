import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Listar todos os menus (GET)
export async function GET() {
  try {
    const menus = await prisma.menu.findMany();
    return NextResponse.json(menus, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar menus:", error);
    return NextResponse.json(
      { error: "Erro ao buscar menus." },
      { status: 500 },
    );
  }
}

// Criar um novo menu (POST)
export async function POST(req: Request) {
  const body = await req.json();
  const {
    name,
    starter,
    starterPrice,
    salad,
    saladPrice,
    mainCourse,
    mainCoursePrice,
    dessert,
    dessertPrice,
    totalPrice,
    imageUrl,
    restaurantId,
  } = body;

  try {
    const newMenu = await prisma.menu.create({
      data: {
        name,
        starter,
        starterPrice,
        salad,
        saladPrice,
        mainCourse,
        mainCoursePrice,
        dessert,
        dessertPrice,
        totalPrice,
        imageUrl,
        restaurantId,
      },
    });
    return NextResponse.json(newMenu, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar menu:", error);
    return NextResponse.json({ error: "Erro ao criar menu." }, { status: 500 });
  }
}

// Atualizar um menu (PUT)
export async function PUT(req: Request) {
  const body = await req.json();
  const {
    id,
    name,
    starter,
    starterPrice,
    salad,
    saladPrice,
    mainCourse,
    mainCoursePrice,
    dessert,
    dessertPrice,
    totalPrice,
    imageUrl,
  } = body;

  try {
    const updatedMenu = await prisma.menu.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        starter,
        starterPrice,
        salad,
        saladPrice,
        mainCourse,
        mainCoursePrice,
        dessert,
        dessertPrice,
        totalPrice,
        imageUrl,
      },
    });
    return NextResponse.json(updatedMenu, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar menu:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar menu." },
      { status: 500 },
    );
  }
}

// Excluir um menu (DELETE)
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    await prisma.menu.delete({
      where: { id: parseInt(id as string, 10) },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Erro ao excluir menu:", error);
    return NextResponse.json(
      { error: "Erro ao excluir menu." },
      { status: 500 },
    );
  }
}
