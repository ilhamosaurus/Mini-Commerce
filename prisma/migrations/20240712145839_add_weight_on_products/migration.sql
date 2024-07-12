/*
  Warnings:

  - A unique constraint covering the columns `[owner]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "weight" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_owner_key" ON "accounts"("owner");
