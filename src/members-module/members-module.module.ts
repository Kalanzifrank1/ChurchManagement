import { Module } from '@nestjs/common';
import { MembersModuleService } from './members-module.service';
import { MembersModuleController } from './members-module.controller';

@Module({
  providers: [MembersModuleService],
  controllers: [MembersModuleController],
})
export class MembersModuleModule {}
