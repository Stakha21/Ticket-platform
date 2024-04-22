import { IsNumber, ValidateIf } from 'class-validator';

export class CreateTicketTierDto {
  @ValidateIf((req) => !req.promoterReceivesPrice || req.buyerPrice)
  @IsNumber()
  buyerPrice?: number;

  @ValidateIf((req) => !req.buyerPrice || req.promoterReceivesPrice)
  @IsNumber()
  promoterReceivesPrice?: number;
}
