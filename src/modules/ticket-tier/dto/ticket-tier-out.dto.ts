import { TicketTier } from '../../../domain/ticket-tier';
import { Exclude, Transform } from 'class-transformer';
import BigNumber from 'bignumber.js';

export class TicketTierOutDto {
  @Exclude()
  id: number;

  referenceId: string;

  @Transform(({ value: price }) => {
    Object.entries(price).forEach(
      ([key, value]: [string, BigNumber]) => (price[key] = value.toNumber()),
    );

    return price;
  })
  price: {
    buyerPrice: number;
    serviceFee: number;
    promoterReceivesPrice: number;
  };

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<TicketTier>) {
    Object.assign(this, partial);
  }
}
