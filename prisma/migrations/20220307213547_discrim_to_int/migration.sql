/*
  Warnings:

  - You are about to alter the column `discrim` on the `Discord` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Discord` MODIFY `discrim` INTEGER NULL;
