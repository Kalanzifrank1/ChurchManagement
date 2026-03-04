import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { MembersModuleService } from './members-module.service';
import { MemberDTO } from './DTO/MemberDto';

@Controller('members')
export class MembersModuleController {
  constructor(private readonly membersService: MembersModuleService) {}

  @Get()
  async getMember(
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
    @Query('familyId') familyId?: string,
  ): Promise<MemberDTO | null> {
    return await this.membersService.findMember1(firstName, lastName, familyId);
  }

  @Post()
  async createMember(@Body() memberDTO: MemberDTO): Promise<MemberDTO | null> {
    return await this.membersService.createMember(memberDTO);
  }
}
