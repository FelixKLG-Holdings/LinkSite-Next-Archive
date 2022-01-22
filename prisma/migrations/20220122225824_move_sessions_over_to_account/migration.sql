/*
  Warnings:

  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - Added the required column `AccountId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropIndex
DROP INDEX `Account_userId_fkey` ON `Account`;

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `userId`,
    ADD COLUMN `AccountId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_AccountId_fkey` FOREIGN KEY (`AccountId`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
