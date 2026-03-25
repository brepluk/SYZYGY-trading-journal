/*
  Warnings:

  - The values [LONG,SHORT] on the enum `PositionSide` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PositionSide_new" AS ENUM ('CALL', 'PUT');
ALTER TABLE "Trade" ALTER COLUMN "positionSide" TYPE "PositionSide_new" USING ("positionSide"::text::"PositionSide_new");
ALTER TYPE "PositionSide" RENAME TO "PositionSide_old";
ALTER TYPE "PositionSide_new" RENAME TO "PositionSide";
DROP TYPE "public"."PositionSide_old";
COMMIT;
