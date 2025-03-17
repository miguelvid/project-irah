import { Drink } from "@prisma/client";

import { db } from "@/lib/prisma";

interface MenuDrinkPageProps {
  params: { slug: string };
}

const formatPrice = (price: number) => {
  return price.toFixed(2).replace(".", ",");
};

const DrinkList = ({ drinks, title }: { drinks: Drink[]; title: string }) => (
  <div className="mb-10">
    <h3 className="mb-4 text-center text-xl font-medium uppercase text-green-800">
      {title}
    </h3>
    <div className="space-y-3">
      {drinks.map((drink) => (
        <div key={drink.id} className="flex items-baseline justify-between">
          <h4 className="font-medium text-green-900">{drink.name}</h4>
          <div className="mx-4 flex-grow border-b border-dotted border-green-800"></div>
          <p className="text-green-900">R${formatPrice(drink.price)}</p>
        </div>
      ))}
    </div>
  </div>
);

const MenuDrinkPage = async ({ params }: MenuDrinkPageProps) => {
  const { slug } = params;

  try {
    const restaurant = await db.restaurant.findUnique({
      where: { slug },
      include: { drinks: true },
    });

    if (!restaurant) {
      return <h1>Restaurante não encontrado</h1>;
    }

    const drinks = restaurant.drinks || [];

    // Group drinks by category
    const wineWhite = drinks.filter(
      (drink) =>
        (drink.category === "WINE" &&
          drink.name.toLowerCase().includes("branco")) ||
        drink.name.toLowerCase().includes("chardonnay") ||
        drink.name.toLowerCase().includes("sauvignon"),
    );
    const wineRed = drinks.filter(
      (drink) =>
        (drink.category === "WINE" &&
          drink.name.toLowerCase().includes("tinto")) ||
        drink.name.toLowerCase().includes("malbec") ||
        drink.name.toLowerCase().includes("cabernet"),
    );
    const wineRose = drinks.filter(
      (drink) =>
        (drink.category === "WINE" &&
          drink.name.toLowerCase().includes("rosé")) ||
        drink.name.toLowerCase().includes("rose"),
    );
    const sparkling = drinks.filter((drink) => drink.category === "SPARKLING");
    const beers = drinks.filter((drink) => drink.category === "BEER");
    const diverse = drinks.filter((drink) => drink.category === "DIVERSE");

    return (
      <div className="relative mx-auto max-w-3xl bg-[#f4eed5] p-6">
        {/* Header */}
        <div className="relative z-10 mb-12 text-center">
          <h1 className="font-serif text-5xl tracking-wider text-green-800">
            IRÁH
          </h1>
          <h2 className="mt-2 text-2xl uppercase tracking-widest text-green-800">
            GASTRONOMIA
          </h2>
        </div>

        {/* Menu content */}
        <div className="relative z-10">
          {/* VINHOS section header */}
          {(wineWhite.length > 0 ||
            wineRed.length > 0 ||
            wineRose.length > 0) && (
            <h2 className="mb-6 text-center text-2xl font-medium uppercase text-green-800">
              VINHOS
            </h2>
          )}

          {/* White Wine */}
          {wineWhite.length > 0 && (
            <DrinkList drinks={wineWhite} title="BRANCO" />
          )}

          {/* Red Wine */}
          {wineRed.length > 0 && <DrinkList drinks={wineRed} title="TINTO" />}

          {/* Rose Wine */}
          {wineRose.length > 0 && <DrinkList drinks={wineRose} title="ROSÉ" />}

          {/* Sparkling */}
          {sparkling.length > 0 && (
            <DrinkList drinks={sparkling} title="ESPUMANTES" />
          )}

          {/* Beers */}
          {beers.length > 0 && <DrinkList drinks={beers} title="CERVEJAS" />}

          {/* Diverse */}
          {diverse.length > 0 && (
            <DrinkList drinks={diverse} title="DIVERSOS" />
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar restaurante:", error);
    return <h1>Ocorreu um erro ao carregar o menu.</h1>;
  }
};

export default MenuDrinkPage;
