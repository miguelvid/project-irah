/*
  Warnings:

  - The primary key for the `Restaurante` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Bebida" DROP CONSTRAINT "Bebida_restauranteId_fkey";

-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_restauranteId_fkey";

-- AlterTable
ALTER TABLE "Bebida" ALTER COLUMN "restauranteId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Menu" ALTER COLUMN "restauranteId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Restaurante" DROP CONSTRAINT "Restaurante_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Restaurante_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Restaurante_id_seq";

-- AddForeignKey
ALTER TABLE "Bebida" ADD CONSTRAINT "Bebida_restauranteId_fkey" FOREIGN KEY ("restauranteId") REFERENCES "Restaurante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_restauranteId_fkey" FOREIGN KEY ("restauranteId") REFERENCES "Restaurante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
