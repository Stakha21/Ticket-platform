import { TicketTierPrice } from '../domain/ticket-tier';
import BigNumber from 'bignumber.js';
import config from '../infrastructure/config/config';

type CalculateTicketPriceParameters = {
  buyerPrice?: number | undefined;
  promoterReceivesPrice?: number | undefined;
};

export function calculateTicketPrice({
  buyerPrice,
  promoterReceivesPrice,
}: CalculateTicketPriceParameters): TicketTierPrice {
  const platformSettings = config().platformSettings;

  if (buyerPrice) {
    const bigBuyerPrice = new BigNumber(buyerPrice);

    const calculatedServiceFee = new BigNumber(
      bigBuyerPrice
        .multipliedBy(platformSettings.serviceFeeRate)
        .dividedBy(100)
        .toFixed(2),
    );

    const serviceFee = calculatedServiceFee.gt(platformSettings.minimumFee)
      ? calculatedServiceFee
      : new BigNumber(platformSettings.minimumFee);

    return {
      buyerPrice: bigBuyerPrice,
      serviceFee,
      promoterReceivesPrice: bigBuyerPrice.minus(serviceFee),
    };
  }

  if (promoterReceivesPrice) {
    const bigPromoterReceivesPrice = new BigNumber(promoterReceivesPrice);

    const calculatedBuyerPrice = new BigNumber(
      bigPromoterReceivesPrice
        .dividedBy(1 - platformSettings.serviceFeeRate / 100)
        .toFixed(2),
    );

    const calculatedServiceFee = new BigNumber(
      calculatedBuyerPrice
        .multipliedBy(platformSettings.serviceFeeRate)
        .dividedBy(100)
        .toFixed(2),
    );

    const serviceFee = calculatedServiceFee.gt(platformSettings.minimumFee)
      ? calculatedServiceFee
      : new BigNumber(platformSettings.minimumFee);

    return {
      buyerPrice: bigPromoterReceivesPrice.plus(serviceFee),
      serviceFee,
      promoterReceivesPrice: bigPromoterReceivesPrice,
    };
  }
}
