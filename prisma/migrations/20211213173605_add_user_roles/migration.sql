-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('ADMIN', 'DEV', 'SUPPORT', 'USER') NOT NULL DEFAULT 'USER';
