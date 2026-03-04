import { Module } from '@nestjs/common';
import { MembersModuleService } from './members-module.service';
import { MembersModuleController } from './members-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './memberEntity/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity])],
  providers: [MembersModuleService],
  controllers: [MembersModuleController],
})
export class MembersModuleModule {}
