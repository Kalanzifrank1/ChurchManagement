import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsUUID,
  IsArray,
} from 'class-validator';
import { ChurchMember } from '../../types/ChurchMember';

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

export enum RoleInChurch {
  MEMBER = 'MEMBER',
  ELDER = 'ELDER',
  DEACON = 'DEACON',
  PASTOR = 'PASTOR',
}

/**
 * DTO used for creating / updating a member.
 * validation decorators are applied to mirror the
 * fields defined on MemberEntity / ChurchMember type.
 */
export class MemberDTO implements Partial<ChurchMember> {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsDateString()
  membershipDate: Date | string;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(RoleInChurch)
  roleInChurch: RoleInChurch;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @IsUUID()
  @IsOptional()
  familyId?: string;

  // group ids can be passed when creating/updating a member
  @IsArray()
  @IsOptional()
  groups?: string[];
}