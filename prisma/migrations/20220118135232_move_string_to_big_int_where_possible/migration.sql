/*
  Warnings:

  - You are about to drop the column `steamId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_steamId_key` ON `User`;

-- AlterTable
ALTER TABLE `Ticket` MODIFY `addon` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `steamId`;
