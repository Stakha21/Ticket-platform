-- CreateTable
CREATE TABLE "TicketTier" (
    "id" SERIAL NOT NULL,
    "referenceId" TEXT NOT NULL,
    "buyerPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketTier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TicketTier_referenceId_key" ON "TicketTier"("referenceId");
