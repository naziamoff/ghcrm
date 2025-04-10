-- CreateTable
CREATE TABLE "access_token" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "access_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "access_token_token_key" ON "access_token"("token");

-- AddForeignKey
ALTER TABLE "access_token" ADD CONSTRAINT "access_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
