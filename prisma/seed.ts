/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

// Função para gerar um slug a partir do nome
const gerarSlug = (nome: string) => {
  return nome
    .toLowerCase() // Converte para minúsculas
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/[^\w\-]+/g, ""); // Remove caracteres especiais
};

const main = async () => {
  try {
    await prismaClient.$transaction(async (tx: any) => {
      console.log("Iniciando transação...");

      // Limpa as tabelas
      await tx.drink.deleteMany();
      console.log("Tabela drink limpa.");
      await tx.menu.deleteMany();
      console.log("Tabela menu limpa.");
      await tx.restaurant.deleteMany();
      console.log("Tabela restaurant limpa.");

      // Cria um restaurante
      const nomeRestaurante = "Iráh Gastronomia";
      const restaurante = await tx.restaurant.create({
        data: {
          name: nomeRestaurante,
          slug: gerarSlug(nomeRestaurante), // Gera o slug automaticamente
          description: "Um lugar onde a gastronomia encontra a arte.",
          address: "Rua dos Sabores, 123",
          phone: "(11) 1234-5678",
          imageAvatar: "https://seusite.com/imagens/restaurante/avatar.jpg",
          imageCover: "https://seusite.com/imagens/restaurante/cover.jpg",
        },
      });
      console.log("Restaurante criado:", restaurante);

      // Cria algumas bebidas
      await tx.drink.createMany({
        data: [
          {
            name: "DV Catena Chardonnay",
            description: "Vinho branco da variedade Chardonnay.",
            price: 169.0,
            category: "WINE",
            restaurantId: restaurante.id,
          },
          {
            name: "La Linda Chardonnay",
            description: "Vinho branco Chardonnay.",
            price: 117.0,
            category: "WINE",
            restaurantId: restaurante.id,
          },
          {
            name: "Las Perdices Blanc",
            description: "Vinho branco.",
            price: 127.0,
            category: "WINE",
            restaurantId: restaurante.id,
          },
          {
            name: "Pulenta - Sauvignon Blanc",
            description: "Vinho branco da variedade Sauvignon Blanc.",
            price: 137.0,
            category: "WINE",
            restaurantId: restaurante.id,
          },
          {
            name: "Angelica Zapata",
            description: "Vinho tinto.",
            price: 294.0,
            category: "WINE",
            restaurantId: restaurante.id,
          },
          {
            name: "DV Catena Malbec",
            description: "Vinho tinto da variedade Malbec.",
            price: 202.0,
            category: "WINE",
            restaurantId: restaurante.id,
          },
          {
            name: "DV Catena Cabernet Malbec",
            description: "Vinho tinto da variedade Cabernet Malbec.",
            price: 175.0,
            category: "WINE",
            restaurantId: restaurante.id,
          },
          {
            name: "Renacer Milamore Cabernet Malbec",
            description: "Vinho tinto da variedade Cabernet Malbec.",
            price: 166.0,
            category: "WINE",
            restaurantId: restaurante.id,
          },
          {
            name: "La Linda Malbec",
            description: "Vinho tinto da variedade Malbec.",
            price: 117.0,
            category: "WINE",
            restaurantId: restaurante.id,
          },
          {
            name: "DV Nicásia Cabernet Malbec",
            description: "Vinho tinto da variedade Cabernet Malbec.",
            price: 127.0,
            category: "WINE",
            restaurantId: restaurante.id,
          },
          {
            name: "DV San Felicien Malbec",
            description: "Vinho tinto da variedade Malbec.",
            price: 132.0,
            category: "WINE",
            restaurantId: restaurante.id,
          },
          {
            name: "Las Perdices Malbec",
            description: "Vinho tinto da variedade Malbec.",
            price: 127.0,
            category: "WINE",
            restaurantId: restaurante.id,
          },
          {
            name: "Cordero con Piel de Lobo",
            description: "Vinho rosé.",
            price: 127.0,
            category: "WINE",
            restaurantId: restaurante.id,
          },
          {
            name: "Pulenta Rosé",
            description: "Vinho rosé.",
            price: 175.0,
            category: "WINE",
            restaurantId: restaurante.id,
          },
          {
            name: "Castellamare Branca/Rosé - Moscatel",
            description: "Espumante branco/rosé da variedade Moscatel.",
            price: 132.0,
            category: "SPARKLING",
            restaurantId: restaurante.id,
          },
          {
            name: "Garibaldi Branca/Rosé - Brut",
            description: "Espumante branco/rosé Brut.",
            price: 108.0,
            category: "SPARKLING",
            restaurantId: restaurante.id,
          },
          {
            name: "Las Perdices Branca/Rosé - Brut",
            description: "Espumante branco/rosé Brut.",
            price: 132.0,
            category: "SPARKLING",
            restaurantId: restaurante.id,
          },
          {
            name: "Sottano - Brut",
            description: "Espumante Brut.",
            price: 127.0,
            category: "SPARKLING",
            restaurantId: restaurante.id,
          },
          {
            name: "Los Haroldos Rosé - Brut",
            description: "Espumante rosé Brut.",
            price: 137.0,
            category: "SPARKLING",
            restaurantId: restaurante.id,
          },
          {
            name: "Stella",
            description: "Cerveja Lager.",
            price: 26.0,
            category: "BEER",
            restaurantId: restaurante.id,
          },
          {
            name: "Cerveja Lager",
            description: "Cerveja Lager.",
            price: 29.0,
            category: "BEER",
            restaurantId: restaurante.id,
          },
          {
            name: "Cerveja IPA",
            description: "Cerveja IPA.",
            price: 29.0,
            category: "BEER",
            restaurantId: restaurante.id,
          },
          {
            name: "Cerveja Weiss",
            description: "Cerveja Weiss.",
            price: 29.0,
            category: "BEER",
            restaurantId: restaurante.id,
          },
          {
            name: "Água C/E S/Bás",
            description: "Água com ou sem gás.",
            price: 7.0,
            category: "DIVERSE",
            restaurantId: restaurante.id,
          },
          {
            name: "Coca-Cola",
            description: "Refrigerante de cola.",
            price: 12.0,
            category: "DIVERSE",
            restaurantId: restaurante.id,
          },
          {
            name: "Suco com/Tem",
            description: "Suco com ou sem açúcar.",
            price: 15.0,
            category: "DIVERSE",
            restaurantId: restaurante.id,
          },
          {
            name: "Tônica",
            description: "Água tônica.",
            price: 12.0,
            category: "DIVERSE",
            restaurantId: restaurante.id,
          },
        ],
      });
      console.log("Bebidas criadas.");

      // Cria alguns menus
      // Cria alguns menus
      await tx.menu.createMany({
        data: [
          {
            name: "Noite Francesa",
            starter: "Sopa de Cebola",
            starterPrice: 19.0,
            salad:
              "Rúcula, Tomate Cereja, Nozes, Queijo Azul, Molho e Geleia de Alho Negro",
            saladPrice: 19.0,
            mainCourse: "Boeuf Bourguignon e Puré de Manteiga",
            mainCoursePrice: 79.0,
            dessert: "Crêpe Suzette",
            dessertPrice: 22.0,
            totalPrice: 19.0 + 19.0 + 79.0 + 22.0,
            imageUrl: "https://seusite.com/imagens/menus/noite-francesa.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Noite Italiana",
            starter: "Ravioli de Ricota, Brócolis ao Molho Pomodoro e Nozes",
            starterPrice: 22.0,
            salad:
              "Tomate, Abobrinha, Berinjela Confitada, Queijo e Molho Italiano",
            saladPrice: 18.0,
            mainCourse:
              "Talharim ao Molho Quatro Queijos, Carne Braseada Desfiada, Tomates Confitados, Cheiro Verde e Queijo Parmesão",
            mainCoursePrice: 79.0,
            dessert: "Panna Cotta",
            dessertPrice: 18.0,
            totalPrice: 22.0 + 18.0 + 79.0 + 18.0,
            imageUrl: "https://seusite.com/imagens/menus/noite-italiana.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu XVIII",
            starter: "Tartare de Parma",
            starterPrice: 22.0,
            salad:
              "Repolho Roxo, Quiabo Confitado, Ervilhas Verdes com Lascas de Rabanete e Gorgonzola",
            saladPrice: 16.0,
            mainCourse:
              "Puré de Manteiga, Filé com Pasta de Cogumelos e Crosta com Raspas de Laranja com Molho de Alho Tostado",
            mainCoursePrice: 79.0,
            dessert: "Red Crêpe",
            dessertPrice: 21.0,
            totalPrice: 22.0 + 16.0 + 79.0 + 21.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-xviii.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu XVII",
            starter: "Cheesecake de Salmão",
            starterPrice: 22.0,
            salad:
              "Folhas de Agrião e Rúcula, Figos ou Ameixas Confitadas, Burrata e Molho Pesto",
            saladPrice: 16.0,
            mainCourse:
              "Lasagnetta de Cogumelos, Rosbife com Molho Bianco de Chardonnay, Alho Poró Tostado e Azeite de Ervas",
            mainCoursePrice: 85.0,
            dessert: "Red Velvet",
            dessertPrice: 21.0,
            totalPrice: 22.0 + 16.0 + 85.0 + 21.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-xvii.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu XVI",
            starter: "Escondidinho de Carne de Cordeiro",
            starterPrice: 22.0,
            salad: "Couve Chinesa e Molho Caesar Defumado",
            saladPrice: 16.0,
            mainCourse:
              "Costela Suína Marinada na Cachaça, Recheada com Cream Cheese e Bacon, Batatas Tostadas e Farofa de Maçã",
            mainCoursePrice: 79.0,
            dessert: "Pudim",
            dessertPrice: 19.0,
            totalPrice: 22.0 + 16.0 + 79.0 + 19.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-xvi.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu XV",
            starter: "Nhoque de Abóbora, Espinafre Confitado e Molho de Manga",
            starterPrice: 19.0,
            salad:
              "Mix de Folhas, Pepino Japonês, Gorgonzola, Manga e Molho de Gergelim Torrado",
            saladPrice: 16.0,
            mainCourse:
              "Filé Recheado com Cogumelos Confitados e Cream Cheese, Arroz à Piemontese, Pimentões Assados e Molho de Laranja",
            mainCoursePrice: 79.0,
            dessert: "Terrine de Chocolate Branco e Laranja",
            dessertPrice: 21.0,
            totalPrice: 19.0 + 16.0 + 79.0 + 21.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-xv.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu XIV",
            starter: "Camarão na Moranga",
            starterPrice: 32.0,
            salad:
              "Mix de Folhas, Crispy de Cenoura, Pitaya ou Maçã em Lascas, Molho de Iogurte e Fio de Molho Balsâmico",
            saladPrice: 16.0,
            mainCourse:
              "Filé Mignon com Crosta de Parmesão ao Molho Quatro Queijos, Penne ao Molho Pesto e Cogumelos Confitados",
            mainCoursePrice: 79.0,
            dessert: "Tiramisú",
            dessertPrice: 22.0,
            totalPrice: 32.0 + 16.0 + 79.0 + 22.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-xiv.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu XII",
            starter: "Steak Tartare",
            starterPrice: 34.0,
            salad: "Couve Chinesa, Molho Caesar e Nozes",
            saladPrice: 15.0,
            mainCourse:
              "Vieiras e Camarões Grelhados ao Molho de Brut Rosé, Puré de Batata Baroa, Crispy de Alho Poró, Tuile de Gergelim",
            mainCoursePrice: 162.0 - 34.0 - 15.0, // Preço total menos entrada e salada
            dessert: "Terrine de Chocolate Branco com Geleia de Laranja",
            dessertPrice: 0.0, // Incluído no preço total
            totalPrice: 162.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-xii.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu XI",
            starter: "Tartare de Abacaxi com Cream Cheese",
            starterPrice: 22.0,
            salad:
              "Alface, Gorgonzola, Figos, Crispy de Banana e Molho Agridoce",
            saladPrice: 18.0,
            mainCourse: "Filé au Poivre, Petits Pois à la Française",
            mainCoursePrice: 79.0,
            dessert:
              "Sorvete Gourmet, Calda de Abacaxi com Pimenta e Tuile de Amêndoas",
            dessertPrice: 22.0,
            totalPrice: 22.0 + 18.0 + 79.0 + 22.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-xi.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu X",
            starter: "Mousse de Pimentão com Quiabo",
            starterPrice: 22.0,
            salad:
              "Salada Caprese, Mussarela de Búfala, Tomate Cereja, Abacate e Molho Pesto",
            saladPrice: 19.0,
            mainCourse:
              "Filé Mignon Suíno, Puré de Moranga, Molho de Moranga Cabotiá",
            mainCoursePrice: 72.0,
            dessert: "Tarte Tatin (Torta de Maçã com Calda de Damasco)",
            dessertPrice: 19.0,
            totalPrice: 22.0 + 19.0 + 72.0 + 19.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-x.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu IX",
            starter:
              "Mini Lasanha de Berinjela com Molho Pomodoro e Três Queijos",
            starterPrice: 22.0,
            salad: "Salada Caesar",
            saladPrice: 16.0,
            mainCourse:
              "Filé Mignon ao Molho Hollandaise, Batata Hasselback e Tomate Cereja Confitado",
            mainCoursePrice: 79.0,
            dessert:
              "Pêras Assadas com Crosta de Aveia, Sorvete de Leite Condensado e Calda de Vinho",
            dessertPrice: 19.0,
            totalPrice: 22.0 + 16.0 + 79.0 + 19.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-ix.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu VII",
            starter: "Carpaccio com Molho de Dião, Rúcula e Lascas de Castanha",
            starterPrice: 28.0,
            salad:
              "Nectarinas, Ameixas, Uvas Verdes Confitadas ao Molho de Iogurte Grego, Parmesão e Lascas de Amêndoas Tostadas",
            saladPrice: 25.0,
            mainCourse:
              "Carré de Cordeiro ao Molho de Cranberry, Azeite Aromatizado com Ervas Tostadas, Farofa de Banana Nanica, Mousseline de Mandioca e Crispy de Batata Doce",
            mainCoursePrice: 81.0,
            dessert:
              "Torta Búlgara com Ganache de Chocolate Branco e Leite de Coco",
            dessertPrice: 19.0,
            totalPrice: 28.0 + 25.0 + 81.0 + 19.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-vii.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu VI",
            starter: "Rolinhos de Ricota, Cream Cheese, Brócolis e Bacon",
            starterPrice: 22.0,
            salad:
              "Alface Americana, Azeitona Preta, Ricota, Cebola Roxa, Pepino Japonês e Molho Caesar",
            saladPrice: 16.0,
            mainCourse:
              "Carré Suíno Marinado na Cachaça, Mel e Melado, Gratin de Mandioca, Farofa Crocante, Geleia de Tomate com Pimenta",
            mainCoursePrice: 79.0,
            dessert:
              "Pavê Matrimonial (Creme de Caramelo, Creme de Chocolate Branco e Bolacha Champanhe)",
            dessertPrice: 21.0,
            totalPrice: 22.0 + 16.0 + 79.0 + 21.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-vi.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu V",
            starter:
              "Ceviche de Camarão (Camarões, Cebola Roxa, Abacate e Molho Pesto)",
            starterPrice: 29.0,
            salad: "Mix de Folhas com Amêndoas, Gorgonzola e Molho Balsâmico",
            saladPrice: 16.0,
            mainCourse:
              "Salmão ao Molho de Vinho, Risoto de Figos com Sementes e Chutney de Maçã",
            mainCoursePrice: 84.0,
            dessert:
              "Tortinha de Estrogonofe de Nozes e Sorbet com Calda de Frutas Vermelhas e Ganache",
            dessertPrice: 19.0,
            totalPrice: 29.0 + 16.0 + 84.0 + 19.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-v.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu IV",
            starter:
              "Nectarinas Confitadas com Gorgonzola, Parmesão, Nozes, Rúcula e Mel",
            starterPrice: 22.0,
            salad:
              "Salada Grega (Melão, Parmesão, Hortelã, Rúcula e Molho de Iogurte)",
            saladPrice: 16.0,
            mainCourse:
              "Filé Mignon Assado com Crosta de Ervas e Molho Agridoce, Conchiglione Recheado com Ricota, Brócolis e Parmesão",
            mainCoursePrice: 79.0,
            dessert: "Chico Balanceado",
            dessertPrice: 19.0,
            totalPrice: 22.0 + 16.0 + 79.0 + 19.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-iv.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu III",
            starter:
              "Batatas Recheadas com Ricota, Bacon, Brócolis e Cream Cheese",
            starterPrice: 22.0,
            salad: "Mix de Folhas ao Molho Defumado, Tomate Cereja e Maçã",
            saladPrice: 16.0,
            mainCourse:
              "Entrecot ao Molho de Vinho, Homus de Grão de Bico com Beterrabas Assadas, Legumes Defumados e Farofa Verde",
            mainCoursePrice: 79.0,
            dessert: "Tortinha de Chocolate com Chantilly e Ganache",
            dessertPrice: 21.0,
            totalPrice: 22.0 + 16.0 + 79.0 + 21.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-iii.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu II",
            starter: "Ceviche de Salmão",
            starterPrice: 28.0,
            salad:
              "Alface Americana, Parmesão em Lascas, Tomate Cereja e Molho Caesar",
            saladPrice: 16.0,
            mainCourse:
              "Filé de Peixe à Belle Meunière (Molho de Cogumelos, Alcaparras, Semente de Abóbora e Salsa) e Arroz na Manteiga com Raspas de Limão Siciliano",
            mainCoursePrice: 79.0,
            dessert:
              "Pavlova de Limão (Merengue Crocante, Creme de Limão, Chantilly e Pistache)",
            dessertPrice: 17.0,
            totalPrice: 28.0 + 16.0 + 79.0 + 17.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-ii.jpg",
            restaurantId: restaurante.id,
          },
          {
            name: "Menu I",
            starter:
              "Batatas Recheadas com Ricota, Bacon, Brócolis e Cream Cheese",
            starterPrice: 22.0,
            salad: "Mix de Folhas ao Molho Defumado, Tomate Cereja e Maçã",
            saladPrice: 16.0,
            mainCourse:
              "Entrecot ao Molho de Vinho, Homus de Grão de Bico com Beterrabas Assadas, Legumes Defumados e Farofa Verde",
            mainCoursePrice: 79.0,
            dessert: "Tortinha de Chocolate com Chantilly e Ganache",
            dessertPrice: 21.0,
            totalPrice: 22.0 + 16.0 + 79.0 + 21.0,
            imageUrl: "https://seusite.com/imagens/menus/menu-i.jpg",
            restaurantId: restaurante.id,
          },
        ],
      });
      console.log("Menus criados.");
    });
  } catch (error) {
    console.error("Erro durante a transação:", error);
  } finally {
    await prismaClient.$disconnect();
    console.log("Desconectado do Prisma Client.");
  }
};

main()
  .catch((e) => {
    console.error("Erro no main:", e);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
