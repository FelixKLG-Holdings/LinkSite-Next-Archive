/*
  Warnings:

  - A unique constraint covering the columns `[providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[steamId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `steamId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Account_providerAccountId_key` ON `Account`(`providerAccountId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_steamId_key` ON `User`(`steamId`);
