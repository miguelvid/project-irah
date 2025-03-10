import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";

interface RestaurantPageProps {
  params: { slug: string };
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await db.restaurante.findUnique({ where: { slug } });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* LOGO e TITULO */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src="/images.png"
          alt={restaurant.nome}
          width={120}
          height={120}
          className="rounded-full"
        />
        <h1 className="font-serif text-2xl tracking-widest">
          {restaurant.nome}
        </h1>
      </div>
      {/* BEM VINDO */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        <p className="opacity-75">
          Memoria afetiva, alta gastronomia e muito sabor. Vamos surpreender o
          seu paladar! Menu exclusivo e único por noite!
        </p>
      </div>
      <div className="grid gap-4 pt-14">
        <Button
          variant="secondary"
          className="cplduration-300 px-8 py-3 tracking-wider text-amber-200 marker:transition hover:bg-amber-300 hover:text-emerald-900"
        >
          Cardapio bebidas
        </Button>
        <Button
          variant="secondary"
          className="px-8 py-3 tracking-wider text-amber-200 transition duration-300 hover:bg-amber-300 hover:text-emerald-900"
        >
          Reservas
        </Button>
      </div>
    </div>
  );
};

export default RestaurantPage;
