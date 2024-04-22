import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './infrastructure/config/config';
import { TicketTierModule } from './modules/ticket-tier/ticket-tier.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TicketTierModule,
  ],
})
export class AppModule {}
