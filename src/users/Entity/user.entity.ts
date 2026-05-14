// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users1')
export class User {
  @PrimaryGeneratedColumn()
  userId!: number;

  @Column({ name: 'user_name' })
  userName!: string;

  @Column({ name: 'password' })
  password!: string;
}
