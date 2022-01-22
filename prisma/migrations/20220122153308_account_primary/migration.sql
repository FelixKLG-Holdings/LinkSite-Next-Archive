/*
  Warnings:

  - You are about to drop the column `type` on the `Account` table. All the data in the column will be lost.
  - Added the required column `AccountId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- AlterTable
ALTER TABLE `Account` DROP COLUMN `type`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `AccountId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_AccountId_fkey` FOREIGN KEY (`AccountId`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
