/*
  Warnings:

  - You are about to drop the column `discordId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `discordOAuthRegen` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `discordOAuthToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Account_discordId_key` ON `Account`;

-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `Account` DROP COLUMN `discordId`,
    DROP COLUMN `discordOAuthRegen`,
    DROP COLUMN `discordOAuthToken`,
    DROP COLUMN `expiresAt`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`;

-- CreateTable
CREATE TABLE `Discord` (
    `accountId` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `discrim` INTEGER NULL,
    `token` VARCHAR(191) NOT NULL,
    `regenToken` VARCHAR(191) NOT NULL,
    `tokenExp` INTEGER NOT NULL,

    UNIQUE INDEX `Discord_id_key`(`id`),
    UNIQUE INDEX `Discord_accountId_key`(`accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Discord` ADD CONSTRAINT `Discord_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
