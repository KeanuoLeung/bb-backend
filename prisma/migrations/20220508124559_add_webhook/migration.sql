-- CreateTable
CREATE TABLE "ClientWebhook" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "clientId" TEXT,

    CONSTRAINT "ClientWebhook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientWebhook" ADD CONSTRAINT "ClientWebhook_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
