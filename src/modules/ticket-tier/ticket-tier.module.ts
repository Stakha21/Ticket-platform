import { Module } from '@nestjs/common';
import { TicketTierController } from './ticket-tier.controller';
import { TicketTierService } from './ticket-tier.service';
import { TicketTierRepository } from '../../infrastructure/postgres/repository/ticket-tier.repository';
import { PrismaInit } from '../../infrastructure/postgres/prisma/prisma.init';

@Module({
  controllers: [TicketTierController],
  providers: [TicketTierRepository, TicketTierService, PrismaInit],
})
export class TicketTierModule {}
