/*
  Warnings:

  - You are about to alter the column `steamId` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `id` on the `Discord` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.

*/
-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_author_fkey`;

-- DropForeignKey
ALTER TABLE `TicketAttachments` DROP FOREIGN KEY `TicketAttachments_author_fkey`;

-- DropForeignKey
ALTER TABLE `TicketAttachments` DROP FOREIGN KEY `TicketAttachments_ticketId_fkey`;

-- DropForeignKey
ALTER TABLE `TicketReplies` DROP FOREIGN KEY `TicketReplies_author_fkey`;

-- DropForeignKey
ALTER TABLE `TicketReplies` DROP FOREIGN KEY `TicketReplies_ticketId_fkey`;

-- AlterTable
ALTER TABLE `Account` MODIFY `steamId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `Discord` MODIFY `id` BIGINT NULL;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_author_fkey` FOREIGN KEY (`author`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketReplies` ADD CONSTRAINT `TicketReplies_author_fkey` FOREIGN KEY (`author`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketReplies` ADD CONSTRAINT `TicketReplies_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketAttachments` ADD CONSTRAINT `TicketAttachments_author_fkey` FOREIGN KEY (`author`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketAttachments` ADD CONSTRAINT `TicketAttachments_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
