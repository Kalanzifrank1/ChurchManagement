/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './Entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async addUserTo(user: User): Promise<User> {
    user.password = await this.hashPassword(user.password);
    const addUser = await this.usersRepository.save(user);
    return addUser;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(userName: string, passwordF: string): Promise<User | null> {
    const foundUser = await this.usersRepository.findOneBy({ userName });
    if (!foundUser) {
      throw new UnauthorizedException("User not found");
    }
    return foundUser; // Return the whole object including the password hash
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }


  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10; // The cost factor
    return await bcrypt.hash(password, saltOrRounds);
  }
}
