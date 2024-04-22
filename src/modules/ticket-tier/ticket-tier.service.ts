import { Injectable } from '@nestjs/common';
import { TicketTierRepository } from '../../infrastructure/postgres/repository/ticket-tier.repository';
import { TicketTier } from '../../domain/ticket-tier';
import { CreateTicketTierDto } from './dto/create-ticket-tier.dto';
import { calculateTicketPrice } from '../../helpers/calculate-ticket-price';
import { UpdateTicketTierDto } from './dto/update-ticket-tier.dto';

@Injectable()
export class TicketTierService {
  constructor(private readonly ticketTierRepository: TicketTierRepository) {}

  async create(parameters: CreateTicketTierDto): Promise<TicketTier | Error> {
    const price = calculateTicketPrice({
      buyerPrice: parameters.buyerPrice,
      promoterReceivesPrice: parameters.promoterReceivesPrice,
    });

    return this.ticketTierRepository.create(price);
  }

  async update(parameters: UpdateTicketTierDto): Promise<TicketTier | Error> {
    const price = calculateTicketPrice({
      buyerPrice: parameters.buyerPrice,
      promoterReceivesPrice: parameters.promoterReceivesPrice,
    });

    return this.ticketTierRepository.update({
      referenceId: parameters.referenceId,
      ...price,
    });
  }

  async get(referenceId: string): Promise<TicketTier | Error> {
    return this.ticketTierRepository.get(referenceId);
  }
}
