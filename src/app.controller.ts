import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { UserType } from './types/User';
import type { Request as ExpressReq } from 'express';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req: ExpressReq) {
    return this.authService.login(req.user as UserType);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: ExpressReq) {
    return req.user as UserType;
  }
}
