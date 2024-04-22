import { calculateTicketPrice } from '../../helpers/calculate-ticket-price';
import BigNumber from 'bignumber.js';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

describe('Calculate Ticket Price', () => {
  beforeEach(async () => {
    return Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [
            () =>
              import('../../infrastructure/config/config').then(
                (module) => module.default,
              ),
          ],
          isGlobal: true,
        }),
      ],
    });
  });

  it('should calculate correct price on buyerPrice with min fee', () => {
    const result = calculateTicketPrice({
      buyerPrice: 15,
    });

    expect(result).toStrictEqual(
      expect.objectContaining({
        buyerPrice: new BigNumber(15),
        serviceFee: new BigNumber(10),
        promoterReceivesPrice: new BigNumber(5),
      }),
    );
  });

  it('should calculate correct price on promoterReceivesPrice with min fee', () => {
    const result = calculateTicketPrice({
      promoterReceivesPrice: 5,
    });

    expect(result).toStrictEqual(
      expect.objectContaining({
        buyerPrice: new BigNumber(15),
        serviceFee: new BigNumber(10),
        promoterReceivesPrice: new BigNumber(5),
      }),
    );
  });

  it('should calculate correct price on buyerPrice with calculated fee', () => {
    const result = calculateTicketPrice({
      buyerPrice: 1000,
    });

    expect(result).toStrictEqual(
      expect.objectContaining({
        buyerPrice: new BigNumber(1000),
        serviceFee: new BigNumber(50),
        promoterReceivesPrice: new BigNumber(950),
      }),
    );
  });

  it('should calculate correct price on promoterReceivesPrice with calculated fee', () => {
    const result = calculateTicketPrice({
      promoterReceivesPrice: 950,
    });

    expect(result).toStrictEqual(
      expect.objectContaining({
        buyerPrice: new BigNumber(1000),
        serviceFee: new BigNumber(50),
        promoterReceivesPrice: new BigNumber(950),
      }),
    );
  });
});
