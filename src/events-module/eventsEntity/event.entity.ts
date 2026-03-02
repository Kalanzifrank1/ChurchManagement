import * as crypto from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: crypto.UUID;
  @Column()
  title: string;
  @Column()
  description: Text;
  @Column()
  startTime: string; //DateTime
  @Column()
  endTime: string; //DateTime
  @Column()
  location: string;
}
