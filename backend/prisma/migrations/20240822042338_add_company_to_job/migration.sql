/*
  Warnings:

  - Added the required column `company` to the `job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job" ADD COLUMN     "company" VARCHAR(100) NOT NULL;
