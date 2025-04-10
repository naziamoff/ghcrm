/*
  Warnings:

  - Added the required column `external_created_at` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "external_created_at" TIMESTAMP(3) NOT NULL;
