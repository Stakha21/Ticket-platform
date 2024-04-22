import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdateTicketTierDto {
  @IsNotEmpty()
  @IsString()
  referenceId: string;

  @ValidateIf((req) => !req.promoterReceivesPrice || req.buyerPrice)
  @IsNumber()
  buyerPrice?: number;

  @ValidateIf((req) => !req.buyerPrice || req.promoterReceivesPrice)
  @IsNumber()
  promoterReceivesPrice?: number;
}
