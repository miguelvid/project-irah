-- CreateEnum
CREATE TYPE "WineType" AS ENUM ('RED', 'WHITE', 'ROSE');

-- AlterTable
ALTER TABLE "Drink" ADD COLUMN     "wineType" "WineType";
