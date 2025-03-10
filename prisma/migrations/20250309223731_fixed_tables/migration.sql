/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Restaurante` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Restaurante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurante" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurante_slug_key" ON "Restaurante"("slug");
