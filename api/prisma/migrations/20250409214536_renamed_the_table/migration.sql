/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_user_id_fkey";

-- DropTable
DROP TABLE "Project";

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "owner_name" VARCHAR(255) NOT NULL,
    "stars_count" INTEGER NOT NULL,
    "forks_count" INTEGER NOT NULL,
    "issues_count" INTEGER NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
