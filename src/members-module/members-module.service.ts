/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
    try {
      console.log('Creating member:', memberDTO);
      const { groups, ...memberData } = memberDTO;
      const memberEntity = this.memberRepository.create({
        ...memberData,
        groups: groups?.map((id) => ({ id })) || [],
      });
      const createUser = await this.memberRepository.save(memberEntity);
      if (!createUser) {
        console.log('Failed to create member');
        return null;
      }
      console.log('Member created successfully:', createUser.id);
      return {
        ...createUser,
        gender: createUser.gender,
        groups: createUser.groups.map((group) => group.id),
      } as MemberDTO;
    } catch (error) {
      console.error('Error creating member:', error.message);
      throw error;
    }
  }

  //using the index in the entity provides access to
  //const memnber =await repo.findOneBy({ firstName:'Jane', lastName:'Doe', familyId:'…' });
  async findMember1(
    firstName?: string,
    lastName?: string,
    familyId?: string,
  ): Promise<MemberDTO | null> {
    try {
      console.log(
        'Finding member by firstName:',
        firstName,
        'lastName:',
        lastName,
        'familyId:',
        familyId,
      );

      // if (!firstName || !lastName || !familyId) {
      //   console.warn('Missing required query parameters');
      //   return null;
      // }

      //This can also work for the solution below
      // const member = await this.memberRepository.findOne({
      //   where: {
      //     firstName,
      //     lastName,
      //     ...(familyId && { familyId }), // Only adds familyId if it's "truthy"
      //   },
      //   relations: ['groups'],
      // });

      // build where clause dynamically to prevent undefined familyId from being included
      //Type Safety: Using Record<string, any> allows you
      // to add properties to the object on the fly without the TypeScript compiler
      //  yelling at you for adding keys that weren't there at the start.
      const whereClause: Record<string, any> = { firstName, lastName };
      if (familyId !== undefined && familyId !== null) {
        whereClause.familyId = familyId;
      }

      // use findOne with relations so that groups are loaded
      const member = await this.memberRepository.findOne({
        where: whereClause,
        relations: ['groups'],
      });
      if (!member) {
        console.log('Member not found');
        return null;
      }

      console.log('Member found:', member.id);
      return {
        ...member,
        groups: member.groups?.map((group) => group.id) || [],
      } as MemberDTO;
    } catch (error) {
      console.error('Error fetching member:', error.message);
      throw error;
    }
  }
}
