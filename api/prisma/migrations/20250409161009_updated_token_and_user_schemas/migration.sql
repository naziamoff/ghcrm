/*
  Warnings:

  - You are about to drop the column `user_id` on the `access_token` table. All the data in the column will be lost.
  - Added the required column `email` to the `access_token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `access_token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "access_token" DROP CONSTRAINT "access_token_user_id_fkey";

-- AlterTable
ALTER TABLE "access_token" DROP COLUMN "user_id",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "expires_at" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
