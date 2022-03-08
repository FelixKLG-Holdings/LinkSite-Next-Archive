/*
  Warnings:

  - Changed the type of `tokenExp` on the `Discord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `Discord` DROP COLUMN `tokenExp`,
    ADD COLUMN `tokenExp` DATETIME(3) NOT NULL;
