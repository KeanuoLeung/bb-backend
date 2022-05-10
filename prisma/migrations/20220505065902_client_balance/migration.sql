-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "nickname" DROP NOT NULL,
ALTER COLUMN "balance" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ClientAccessToken" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appid" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "clientId" TEXT,

    CONSTRAINT "ClientAccessToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientAccessToken" ADD CONSTRAINT "ClientAccessToken_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
