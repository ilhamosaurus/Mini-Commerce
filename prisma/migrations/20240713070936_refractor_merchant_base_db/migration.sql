/*
  Warnings:

  - Added the required column `merchant` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'MERCHANT');

-- AlterEnum
ALTER TYPE "Type" ADD VALUE 'REVENUE';

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "merchant" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "buyer" TEXT,
ADD COLUMN     "merchant" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_merchant_fkey" FOREIGN KEY ("merchant") REFERENCES "users"("username") ON DELETE CASCADE ON UPDATE CASCADE;
