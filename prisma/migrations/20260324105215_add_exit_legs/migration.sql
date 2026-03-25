-- CreateTable
CREATE TABLE "ExitLeg" (
    "id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "exitDate" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "tradeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExitLeg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExitLeg_tradeId_exitDate_idx" ON "ExitLeg"("tradeId", "exitDate");

-- AddForeignKey
ALTER TABLE "ExitLeg" ADD CONSTRAINT "ExitLeg_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
