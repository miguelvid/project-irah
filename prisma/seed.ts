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
      await tx.bebida.deleteMany();
      console.log("Tabela bebida limpa.");
      await tx.menu.deleteMany();
      console.log("Tabela menu limpa.");
      await tx.restaurante.deleteMany();
      console.log("Tabela restaurante limpa.");

      // Cria um restaurante
      const nomeRestaurante = "Iráh Gastronomia";
      const restaurante = await tx.restaurante.create({
        data: {
          nome: nomeRestaurante,
          slug: gerarSlug(nomeRestaurante), // Gera o slug automaticamente
          descricao: "Um lugar onde a gastronomia encontra a arte.",
          endereco: "Rua dos Sabores, 123",
          telefone: "(11) 1234-5678",
          imageAvatar: "https://seusite.com/imagens/restaurante/avatar.jpg",
          imageCover: "https://seusite.com/imagens/restaurante/cover.jpg",
        },
      });
      console.log("Restaurante criado:", restaurante);

      // Cria algumas bebidas
      await tx.bebida.createMany({
        data: [
          {
            nome: "DV Catena Chardonnay",
            descricao: "Vinho branco da variedade Chardonnay.",
            preco: 169.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/dv-catena-chardonnay.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "La Linda Chardonnay",
            descricao: "Vinho branco Chardonnay.",
            preco: 117.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/la-linda-chardonnay.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Las Perdices Blanc",
            descricao: "Vinho branco.",
            preco: 127.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/las-perdices-blanc.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Pulenta - Sauvignon Blanc",
            descricao: "Vinho branco da variedade Sauvignon Blanc.",
            preco: 137.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/pulenta-sauvignon-blanc.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Angelica Zapata",
            descricao: "Vinho tinto.",
            preco: 294.0,
            imageUrl: "https://seusite.com/imagens/bebidas/angelica-zapata.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "DV Catena Malbec",
            descricao: "Vinho tinto da variedade Malbec.",
            preco: 202.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/dv-catena-malbec.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "DV Catena Cabernet Malbec",
            descricao: "Vinho tinto da variedade Cabernet Malbec.",
            preco: 175.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/dv-catena-cabernet-malbec.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Renacer Milamore Cabernet Malbec",
            descricao: "Vinho tinto da variedade Cabernet Malbec.",
            preco: 166.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/renacer-milamore-cabernet-malbec.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "La Linda Malbec",
            descricao: "Vinho tinto da variedade Malbec.",
            preco: 117.0,
            imageUrl: "https://seusite.com/imagens/bebidas/la-linda-malbec.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "DV Nicásia Cabernet Malbec",
            descricao: "Vinho tinto da variedade Cabernet Malbec.",
            preco: 127.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/dv-nicasia-cabernet-malbec.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "DV San Felicien Malbec",
            descricao: "Vinho tinto da variedade Malbec.",
            preco: 132.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/dv-san-felicien-malbec.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Las Perdices Malbec",
            descricao: "Vinho tinto da variedade Malbec.",
            preco: 127.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/las-perdices-malbec.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Cordero con Piel de Lobo",
            descricao: "Vinho rosé.",
            preco: 127.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/cordero-con-piel-de-lobo.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Pulenta Rosé",
            descricao: "Vinho rosé.",
            preco: 175.0,
            imageUrl: "https://seusite.com/imagens/bebidas/pulenta-rose.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Castellamare Branca/Rosé - Moscatel",
            descricao: "Espumante branco/rosé da variedade Moscatel.",
            preco: 132.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/castellamare-moscatel.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Garibaldi Branca/Rosé - Brut",
            descricao: "Espumante branco/rosé Brut.",
            preco: 108.0,
            imageUrl: "https://seusite.com/imagens/bebidas/garibaldi-brut.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Las Perdices Branca/Rosé - Brut",
            descricao: "Espumante branco/rosé Brut.",
            preco: 132.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/las-perdices-brut.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Sottano - Brut",
            descricao: "Espumante Brut.",
            preco: 127.0,
            imageUrl: "https://seusite.com/imagens/bebidas/sottano-brut.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Los Haroldos Rosé - Brut",
            descricao: "Espumante rosé Brut.",
            preco: 137.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/los-haroldos-rose-brut.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Stella",
            descricao: "Cerveja Lager.",
            preco: 26.0,
            imageUrl: "https://seusite.com/imagens/bebidas/stella.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Cerveja Lager",
            descricao: "Cerveja Lager.",
            preco: 29.0,
            imageUrl: "https://seusite.com/imagens/bebidas/cerveja-lager.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Cerveja IPA",
            descricao: "Cerveja IPA.",
            preco: 29.0,
            imageUrl: "https://seusite.com/imagens/bebidas/cerveja-ipa.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Cerveja Weiss",
            descricao: "Cerveja Weiss.",
            preco: 29.0,
            imageUrl: "https://seusite.com/imagens/bebidas/cerveja-weiss.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Água C/E S/Bás",
            descricao: "Água com ou sem gás.",
            preco: 7.0,
            imageUrl: "https://seusite.com/imagens/bebidas/agua.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Coca-Cola",
            descricao: "Refrigerante de cola.",
            preco: 12.0,
            imageUrl: "https://seusite.com/imagens/bebidas/coca-cola.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Suco com/Tem",
            descricao: "Suco com ou sem açúcar.",
            preco: 15.0,
            imageUrl: "https://seusite.com/imagens/bebidas/suco.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Tônica",
            descricao: "Água tônica.",
            preco: 12.0,
            imageUrl: "https://seusite.com/imagens/bebidas/tonica.jpg",
            restauranteId: restaurante.id,
          },
        ],
      });
      console.log("Bebidas criadas.");

      // Cria alguns menus
      await tx.menu.createMany({
        data: [
          {
            nome: "Menu Executivo",
            entrada: "Bruschetta de Tomate Seco",
            precoEntrada: 10.0,
            salada: "Salada Caesar",
            precoSalada: 12.0,
            pratoPrincipal: "Filé Mignon com Molho de Vinho",
            precoPrato: 45.0,
            doce: "Petit Gateau",
            precoDoce: 15.0,
            precoTotal: 10.0 + 12.0 + 45.0 + 15.0, // Cálculo automático
            imageUrl: "https://seusite.com/imagens/menus/menu-executivo.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Menu Vegetariano",
            entrada: "Carpaccio de Berinjela",
            precoEntrada: 9.0,
            salada: "Salada de Quinoa",
            precoSalada: 10.0,
            pratoPrincipal: "Lasanha de Abobrinha",
            precoPrato: 35.0,
            doce: "Mousse de Maracujá",
            precoDoce: 12.0,
            precoTotal: 9.0 + 10.0 + 35.0 + 12.0, // Cálculo automático
            imageUrl: "https://seusite.com/imagens/menus/menu-vegetariano.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Menu Infantil",
            entrada: "Mini Coxinhas",
            precoEntrada: 8.0,
            salada: "Salada de Frutas",
            precoSalada: 7.0,
            pratoPrincipal: "Macarrão com Queijo",
            precoPrato: 20.0,
            doce: "Sorvete de Chocolate",
            precoDoce: 10.0,
            precoTotal: 8.0 + 7.0 + 20.0 + 10.0, // Cálculo automático
            imageUrl: "https://seusite.com/imagens/menus/menu-infantil.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Menu Light",
            entrada: "Creme de Espinafre",
            precoEntrada: 8.5,
            salada: "Salada Verde com Molho de Iogurte",
            precoSalada: 9.0,
            pratoPrincipal: "Peixe Grelhado com Legumes",
            precoPrato: 38.0,
            doce: "Gelatina Diet",
            precoDoce: 7.0,
            precoTotal: 8.5 + 9.0 + 38.0 + 7.0, // Cálculo automático
            imageUrl: "https://seusite.com/imagens/menus/menu-light.jpg",
            restauranteId: restaurante.id,
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
