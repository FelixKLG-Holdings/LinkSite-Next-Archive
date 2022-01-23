/*
  Warnings:

  - You are about to drop the column `discord_id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `oauth_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `oauth_token_secret` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `steam_id` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[steamId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `steamId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Account_discord_id_key` ON `Account`;

-- DropIndex
DROP INDEX `Account_steam_id_key` ON `Account`;

-- AlterTable
ALTER TABLE `Account` DROP COLUMN `discord_id`,
    DROP COLUMN `oauth_token`,
    DROP COLUMN `oauth_token_secret`,
    DROP COLUMN `steam_id`,
    ADD COLUMN `discordId` BIGINT NULL,
    ADD COLUMN `oauthToken` VARCHAR(191) NULL,
    ADD COLUMN `oauthTokenSecret` VARCHAR(191) NULL,
    ADD COLUMN `steamId` BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Account_steamId_key` ON `Account`(`steamId`);

-- CreateIndex
CREATE UNIQUE INDEX `Account_discordId_key` ON `Account`(`discordId`);
