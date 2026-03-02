import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  type Relation,
} from 'typeorm';
import { MemberEntity } from './member.entity'; // Import the Member

@Entity()
export class FamilyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  familyName: string;

  @Column()
  address: string;

  @Column()
  householdHeadId: number;

  // Add this to complete the "Many-to-One" link
  @OneToMany(() => MemberEntity, (member) => member.family)
  members: Relation<MemberEntity[]>;
}
