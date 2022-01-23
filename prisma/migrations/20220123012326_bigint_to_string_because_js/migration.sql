-- AlterTable
ALTER TABLE `Account` MODIFY `discordId` VARCHAR(191) NULL,
    MODIFY `steamId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Ticket` MODIFY `addon` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `TicketAttachments` ADD CONSTRAINT `TicketAttachments_author_fkey` FOREIGN KEY (`author`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
