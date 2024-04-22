import BigNumber from 'bignumber.js';

export type TicketTierPrice = {
  buyerPrice: BigNumber;
  serviceFee: BigNumber;
  promoterReceivesPrice: BigNumber;
};

export type TicketTier = {
  id: number;
  referenceId: string;
  price: TicketTierPrice;
  createdAt: Date;
  updatedAt: Date;
};
