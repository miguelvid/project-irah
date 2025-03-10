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
            nome: "Suco de Laranja Natural",
            descricao: "Suco fresco de laranja, sem adição de açúcar.",
            preco: 8.5,
            imageUrl: "https://seusite.com/imagens/bebidas/suco-laranja.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Refrigerante Cola",
            descricao: "Refrigerante de cola gelado.",
            preco: 6.0,
            imageUrl: "https://seusite.com/imagens/bebidas/refri-cola.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Água com Gás",
            descricao: "Água mineral com gás e limão.",
            preco: 4.5,
            imageUrl: "https://seusite.com/imagens/bebidas/agua-gas.jpg",
            restauranteId: restaurante.id,
          },
          {
            nome: "Cerveja Artesanal",
            descricao: "Cerveja artesanal da casa, 500ml.",
            preco: 12.0,
            imageUrl:
              "https://seusite.com/imagens/bebidas/cerveja-artesanal.jpg",
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
