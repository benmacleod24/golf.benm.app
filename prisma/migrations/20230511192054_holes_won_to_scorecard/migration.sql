/*
  Warnings:

  - Added the required column `numOfHolesWon` to the `Scorecard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numOfOverAll` to the `Scorecard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Scorecard` ADD COLUMN `numOfHolesWon` INTEGER NOT NULL,
    ADD COLUMN `numOfOverAll` INTEGER NOT NULL;
