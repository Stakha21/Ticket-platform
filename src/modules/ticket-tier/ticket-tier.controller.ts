import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TicketTierService } from './ticket-tier.service';
import { CreateTicketTierDto } from './dto/create-ticket-tier.dto';
import { response } from 'express';
import { TicketTierOutDto } from './dto/ticket-tier-out.dto';
import { UpdateTicketTierDto } from './dto/update-ticket-tier.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'ticket-tier', version: '1' })
export class TicketTierController {
  constructor(private readonly ticketTierService: TicketTierService) {}

  @Post()
  async create(
    @Body() createTicketTierDto: CreateTicketTierDto,
  ): Promise<TicketTierOutDto> {
    const ticketTier = await this.ticketTierService.create(createTicketTierDto);

    if (ticketTier instanceof Error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();

      return;
    }

    return new TicketTierOutDto(ticketTier);
  }

  @Patch()
  async update(
    @Body() updateTicketTierDto: UpdateTicketTierDto,
  ): Promise<TicketTierOutDto> {
    const ticketTier = await this.ticketTierService.update(updateTicketTierDto);

    if (ticketTier instanceof Error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();

      return;
    }

    return new TicketTierOutDto(ticketTier);
  }

  @Get()
  async get(
    @Query() query: { referenceId: string },
  ): Promise<TicketTierOutDto> {
    const ticketTier = await this.ticketTierService.get(query.referenceId);

    if (ticketTier instanceof Error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();

      return;
    }

    return new TicketTierOutDto(ticketTier);
  }
}
