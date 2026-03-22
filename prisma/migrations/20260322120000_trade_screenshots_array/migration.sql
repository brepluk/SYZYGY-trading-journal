-- AlterTable
ALTER TABLE "Trade" ADD COLUMN "screenshots" TEXT[] DEFAULT ARRAY[]::TEXT[];

UPDATE "Trade"
SET "screenshots" = ARRAY["screenshotUrl"]::TEXT[]
WHERE "screenshotUrl" IS NOT NULL;

ALTER TABLE "Trade" DROP COLUMN "screenshotUrl";
