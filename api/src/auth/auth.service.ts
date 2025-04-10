import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordService } from './password/password.service';
import { User } from '@prisma/client';
import { Request } from 'express';
import { SignUpDto } from './dto/SignUpDto';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { SignInDto } from './dto/SignInDto';
import { AuthError } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    @Inject(forwardRef(() => EmailConfirmationService))
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    const existingUserByEmail = await this.userService.findByEmail(email);

    if (existingUserByEmail) {
      throw new BadRequestException(AuthError.EmailIsAlreadyTaken);
    }

    const passwordHash = await this.passwordService.hashPassword(password);

    const user = await this.userService.create({
      email,
      passwordHash,
    });

    await this.emailConfirmationService.sendVerificationToken(user.email);

    return {
      message: 'Signed up successfully. Please confirm your email. The confirmation letter was sent to your email',
    };
  }

  async signIn(request: Request, signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException(AuthError.InvalidCredentials);
    }

    await this.passwordService.validatePassword(password, user.passwordHash);

    return this.saveSession(request, user);
  }

  async saveSession(request: Request, user: User) {
    return new Promise((resolve, reject) => {
      request.session.userId = user.id;

      request.session.save((err: Error) => {
        if (err) {
          return reject(
            new InternalServerErrorException(AuthError.FailedToSaveSession),
          );
        }

        resolve({ user });
      });
    });
  }
}
