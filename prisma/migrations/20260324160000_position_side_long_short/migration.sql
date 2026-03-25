-- CreateEnum
CREATE TYPE "PositionSide" AS ENUM ('LONG', 'SHORT');

-- AlterTable
ALTER TABLE "Trade" ADD COLUMN IF NOT EXISTS "positionSide" "PositionSide";

-- Infer long/short from buy/sell (opening direction)
UPDATE "Trade"
SET "positionSide" = CASE
  WHEN "side" = 'SELL' THEN 'SHORT'::"PositionSide"
  ELSE 'LONG'::"PositionSide"
END
WHERE "positionSide" IS NULL;

ALTER TABLE "Trade" DROP COLUMN IF EXISTS "optionRight";

DROP TYPE IF EXISTS "OptionRight";
