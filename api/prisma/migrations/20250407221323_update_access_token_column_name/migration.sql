/*
  Warnings:

  - You are about to drop the column `userId` on the `access_token` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `access_token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "access_token" DROP CONSTRAINT "access_token_userId_fkey";

-- AlterTable
ALTER TABLE "access_token" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "access_token" ADD CONSTRAINT "access_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
