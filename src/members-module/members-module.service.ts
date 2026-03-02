import { Injectable } from '@nestjs/common';
import { MemberDTO } from './DTO/MemberDto';
import { MemberEntity } from './memberEntity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MembersModuleService {
  constructor(
    @InjectRepository(MemberEntity)
    private memberRepository: Repository<MemberEntity>,
  ) {}

  async createMember(memberDTO: MemberDTO): Promise<MemberDTO | null> {
    const { groups, ...memberData } = memberDTO;
    const memberEntity = this.memberRepository.create({
      ...memberData,
      groups: groups?.map((id) => ({ id })) || [],
    });
    const createUser = await this.memberRepository.save(memberEntity);
    if (!createUser) {
      return null;
    }
    return {
      ...createUser,
      gender: createUser.gender,
      groups: createUser.groups.map((group) => group.id),
    } as MemberDTO;
  }
}
