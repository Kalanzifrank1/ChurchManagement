// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users1')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  userName: string;

  @Column()
  password: string;
}
