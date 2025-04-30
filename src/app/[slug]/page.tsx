import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

export default async function HomePage() {
  const restaurant = await getRestaurantBySlug("irh-gastronomia").catch(() => null);

  if (!restaurant) {
    return <div>Nenhum restaurante encontrado</div>;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-0">
      {/* LOGO e TITULO */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src="/logo.png"
          alt={restaurant.name}
          width={540}
          height={540}
          priority
        />
      </div>
      
      {/* BEM VINDO */}
      <div className="pt-16 space-y-2 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        <p className="opacity-75">
          Memória afetiva, alta gastronomia e muito sabor. Vamos surpreender o
          seu paladar! Menu exclusivo e único por noite!
        </p>
      </div>
      
      {/* BOTÕES */}
      <div className="grid gap-4 pt-14">
        <Button
          asChild
          variant="outline"
          className="border-amber-300 px-8 py-3 tracking-wider text-amber-200 hover:bg-amber-300 hover:text-emerald-900 transition duration-300"
        >
          <Link href="/irh-gastronomia/bebidas">Cardápio bebidas</Link>
        </Button>
        <Button
          variant="outline"
          className="border-amber-300 px-8 py-3 tracking-wider text-amber-200 hover:bg-amber-300 hover:text-emerald-900 transition duration-300"
        >
          Reservas
        </Button>
      </div>
    </div>
  );
}