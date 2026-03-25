-- CreateEnum
CREATE TYPE "OptionRight" AS ENUM ('CALL', 'PUT');

-- AlterTable
ALTER TABLE "Trade" ADD COLUMN "optionRight" "OptionRight";
