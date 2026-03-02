import { Module } from '@nestjs/common';
import { EventsModuleService } from './events-module.service';
import { EventsModuleController } from './events-module.controller';

@Module({
  providers: [EventsModuleService],
  controllers: [EventsModuleController]
})
export class EventsModuleModule {}
