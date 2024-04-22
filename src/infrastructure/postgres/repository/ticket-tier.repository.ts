import { Injectable } from '@nestjs/common';
import { PrismaInit } from '../prisma/prisma.init';
import { TicketTier, TicketTierPrice } from '../../../domain/ticket-tier';
import { ErrorType } from '../../../enums/error-types';
import { toDomainTicketMapper } from './mappers/ticket-tier.mapper';
import { v4 } from 'uuid';

@Injectable()
export class TicketTierRepository {
  constructor(private prisma: PrismaInit) {}

  async create(parameters: TicketTierPrice): Promise<TicketTier | Error> {
    try {
      const prismaTicketTier = await this.prisma.ticketTier.create({
        data: {
          referenceId: v4(),
          buyerPrice: parameters.buyerPrice.toNumber(),
        },
      });

      return toDomainTicketMapper(prismaTicketTier);
    } catch (error) {
      return new Error(ErrorType.UNEXPECTED_BEHAVIOR);
    }
  }

  async update(
    parameters: Pick<TicketTier, 'referenceId'> & TicketTierPrice,
  ): Promise<TicketTier | Error> {
    try {
      const prismaTicketTier = await this.prisma.ticketTier.update({
        where: {
          referenceId: parameters.referenceId,
        },
        data: {
          buyerPrice: parameters.buyerPrice.toNumber(),
        },
      });

      return toDomainTicketMapper(prismaTicketTier);
    } catch (error) {
      return new Error(ErrorType.UNEXPECTED_BEHAVIOR);
    }
  }

  async get(referenceId: string): Promise<TicketTier | Error> {
    try {
      const prismaTicketTier = await this.prisma.ticketTier.findUnique({
        where: {
          referenceId,
        },
      });

      return toDomainTicketMapper(prismaTicketTier);
    } catch (error) {
      return new Error(ErrorType.UNEXPECTED_BEHAVIOR);
    }
  }
}
