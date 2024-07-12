/*
  Warnings:

  - Added the required column `invoice` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "invoice" TEXT NOT NULL;
