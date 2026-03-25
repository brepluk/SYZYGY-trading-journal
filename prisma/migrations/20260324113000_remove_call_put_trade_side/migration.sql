-- Recreate TradeSide enum with only BUY/SELL.
ALTER TYPE "TradeSide" RENAME TO "TradeSide_old";
CREATE TYPE "TradeSide" AS ENUM ('BUY', 'SELL');

ALTER TABLE "Trade"
ALTER COLUMN "side" TYPE "TradeSide"
USING ("side"::text::"TradeSide");

DROP TYPE "TradeSide_old";
