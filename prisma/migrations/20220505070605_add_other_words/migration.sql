-- AlterTable
ALTER TABLE "Verifier" ADD COLUMN     "verifierGroupId" TEXT;

-- CreateTable
CREATE TABLE "VerifierGroup" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VerifierGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IllegalWord" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "IllegalWord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IllegalPic" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "IllegalPic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Verifier" ADD CONSTRAINT "Verifier_verifierGroupId_fkey" FOREIGN KEY ("verifierGroupId") REFERENCES "VerifierGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
