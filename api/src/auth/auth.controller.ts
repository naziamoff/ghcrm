import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignInDto';
import { SignUpDto } from './dto/SignUpDto';
import { Request } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  async signUp(
    @Body() signUpDto: SignUpDto,
  ) {
    return this.authService.signUp(signUpDto);
  }

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Req() req: Request,
  ) {
    return await this.authService.signIn(req, signInDto);
  }
}
