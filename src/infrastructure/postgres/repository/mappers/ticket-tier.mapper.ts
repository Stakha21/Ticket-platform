import { TicketTier as PrismaTicketTier } from '@prisma/client';
import { TicketTier } from '../../../../domain/ticket-tier';
import { calculateTicketPrice } from '../../../../helpers/calculate-ticket-price';

export function toDomainTicketMapper(
  prismaTicketTier: PrismaTicketTier,
): TicketTier {
  return {
    id: prismaTicketTier.id,
    referenceId: prismaTicketTier.referenceId,
    price: calculateTicketPrice({
      buyerPrice: prismaTicketTier.buyerPrice,
    }),
    createdAt: prismaTicketTier.createdAt,
    updatedAt: prismaTicketTier.updatedAt,
  };
}
