import { Module } from '@nestjs/common';
import { GroupsModuleController } from './groups-module.controller';
import { GroupsModuleService } from './groups-module.service';

@Module({
  controllers: [GroupsModuleController],
  providers: [GroupsModuleService],
})
export class GroupsModuleModule {}
