/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './Entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addUserTo(user: User): Promise<User> {
    const addUser = await this.usersRepository.save(user);
    return addUser;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(userName: string, password: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ userName });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
