/*
  Warnings:

  - You are about to drop the column `oauthToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `oauthTokenSecret` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Account` DROP COLUMN `oauthToken`,
    DROP COLUMN `oauthTokenSecret`,
    ADD COLUMN `discordOAuthRegen` VARCHAR(191) NULL,
    ADD COLUMN `discordOAuthToken` VARCHAR(191) NULL;
