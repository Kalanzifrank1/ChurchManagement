import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { GroupsEntity } from '../../groups-module/groupsEntity/groups.entity';
import { FamilyEntity } from './family.entity';

//
@Index(['firstName', 'lastName', 'familyId'], { unique: true })
@Entity()
export class MemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column({ default: true })
  isActive: boolean;

  // firstName: String
  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'date' })
  membershipDate: Date;

  @Column({
    type: 'enum',
    enum: ['male', 'female', 'other'],
    default: 'male',
  })
  gender: string;

  // many members may belong to a single family
  @ManyToOne(() => FamilyEntity, (family) => family.members, { nullable: true })
  @JoinColumn({ name: 'familyId' })
  family?: FamilyEntity;

  @Column({ nullable: true })
  familyId?: string; // UUID (Foreign Key to Family)

  @Column({
    type: 'enum',
    enum: ['MEMBER', 'ELDER', 'DEACON', 'PASTOR'],
    default: 'MEMBER',
  })
  roleInChurch: string;

  // many-to-many relationship with groups
  @ManyToMany(() => GroupsEntity, (group) => group.members, { cascade: true })
  @JoinTable({
    name: 'groups_members',
    joinColumn: { name: 'member_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'group_id', referencedColumnName: 'id' },
  })
  groups: GroupsEntity[];
}
