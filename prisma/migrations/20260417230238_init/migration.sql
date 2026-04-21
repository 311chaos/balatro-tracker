-- CreateEnum
CREATE TYPE "StickerLevel" AS ENUM ('WHITE', 'RED', 'GREEN', 'BLACK', 'BLUE', 'PURPLE', 'ORANGE', 'GOLD');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "name" TEXT,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "UserJokerProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jokerId" TEXT NOT NULL,
    "stickerLevel" "StickerLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserJokerProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTarotProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tarotId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserTarotProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVoucherProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "voucherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserVoucherProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPlanetProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPlanetProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "UserJokerProgress_userId_jokerId_key" ON "UserJokerProgress"("userId", "jokerId");

-- CreateIndex
CREATE UNIQUE INDEX "UserTarotProgress_userId_tarotId_key" ON "UserTarotProgress"("userId", "tarotId");

-- CreateIndex
CREATE UNIQUE INDEX "UserVoucherProgress_userId_voucherId_key" ON "UserVoucherProgress"("userId", "voucherId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPlanetProgress_userId_planetId_key" ON "UserPlanetProgress"("userId", "planetId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJokerProgress" ADD CONSTRAINT "UserJokerProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTarotProgress" ADD CONSTRAINT "UserTarotProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVoucherProgress" ADD CONSTRAINT "UserVoucherProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlanetProgress" ADD CONSTRAINT "UserPlanetProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
