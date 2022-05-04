-- CreateEnum
CREATE TYPE "VerifyStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- AlterTable
ALTER TABLE "VerifyRecord" ADD COLUMN     "queueId" TEXT,
ADD COLUMN     "verifyStatus" "VerifyStatus" NOT NULL DEFAULT E'PENDING';

-- CreateTable
CREATE TABLE "Queue" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MachineStrategy" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "queueId" TEXT,

    CONSTRAINT "MachineStrategy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VerifyRecord" ADD CONSTRAINT "VerifyRecord_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "Queue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineStrategy" ADD CONSTRAINT "MachineStrategy_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "Queue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
