-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "owner_name" VARCHAR(255) NOT NULL,
    "stars_count" INTEGER NOT NULL,
    "forks_count" INTEGER NOT NULL,
    "issues_count" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
