-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('IMAGE', 'VIDEO', 'TEXT');

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verifier" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Verifier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerifyRecord" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "verifierId" TEXT,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "VerifyRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Verifier_email_key" ON "Verifier"("email");

-- AddForeignKey
ALTER TABLE "VerifyRecord" ADD CONSTRAINT "VerifyRecord_verifierId_fkey" FOREIGN KEY ("verifierId") REFERENCES "Verifier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifyRecord" ADD CONSTRAINT "VerifyRecord_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
