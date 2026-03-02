import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number; //UUID
  @Column()
  eventId: number; //UUID
  @Column()
  memberId: number; //UUID
  @Column()
  checkInTime: number; //DateTime
  @Column()
  status: number; // Enum (PRESENT, ABSENT, EXCUSED)
}
