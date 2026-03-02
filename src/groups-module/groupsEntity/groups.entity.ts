import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { MemberEntity } from '../../members-module/memberEntity/member.entity';

@Entity()
export class GroupsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; //UUID

  @Column()
  name: string; //String (e.g., "Youth Choir", "North Cell Group")

  @Column({
    type: 'enum',
    enum: ['CELL', 'DEPARTMENT', 'COMMITTEE'],
  })
  type: string;

  // relation to leader (one member can lead many groups)
  @ManyToOne(() => MemberEntity, { nullable: true })
  @JoinColumn({ name: 'leaderId' })
  leader?: MemberEntity;

  @Column({ nullable: true })
  leaderId?: string; // UUID (Foreign Key to Member)

  @ManyToMany(() => MemberEntity, (member) => member.groups)
  members: MemberEntity[];
}
