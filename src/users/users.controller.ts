import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './Entity/user.entity';
import type { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //   @Get()
  //   getHello(): string {
  //     return this.appService.getHello();
  //   }

  @Get()
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @Post()
  async addUser(@Body() user: User, @Res() res: Response) {
    await this.usersService.addUserTo(user);
    return res.status(201).json({ message: 'User added successfully' });
  }
}
