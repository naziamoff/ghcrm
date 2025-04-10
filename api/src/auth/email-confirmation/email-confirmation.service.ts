import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../../user/user.service';
import { ConfirmationDto } from './dto/Confirmation.dto';
import { AccessToken } from '@prisma/client';
import { AccessTokenService } from '../../accessToken/accessToken.service';
import { MailService } from '../../mail/mail.service';
import { AuthError } from '../constants';

@Injectable()
export class EmailConfirmationService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly accessTokenService: AccessTokenService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {
  }

  /**
   * Verifies the token that is being sent from the email confirmation flow.
   * Verifies if the token is valid and not expired, then updates the user's verification status.
   */
  public async newVerification(req: Request, dto: ConfirmationDto) {
    const userByEmail = await this.userService.findByEmail(dto.email);

    if (userByEmail) {
      return null;
    }

    const existingToken = await this.prismaService.accessToken.findUnique({
      where: { token: dto.token },
    });

    if (!existingToken) {
      throw new BadRequestException(AuthError.TokenNotFound);
    }

    const hasExpired = new Date(existingToken.expiresAt) < new Date();

    if (hasExpired) {
      throw new BadRequestException(AuthError.TokenExpired);
    }

    const existingUser = await this.userService.findByEmail(
      existingToken.email,
    );

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    await this.userService.updateByPk(
      existingUser.id,
      { isVerified: true },
    );

    await this.accessTokenService.delete(existingToken.id);

    return this.authService.saveSession(req, existingUser);
  }

  public async sendVerificationToken(email: string): Promise<boolean> {
    const verificationToken = await this.generateVerificationToken(email);

    await this.mailService.sendConfirmationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return true;
  }

  /**
   * Generates a new verification token and stores it.
   * Deletes any existing token for the same email.
   */
  private async generateVerificationToken(email: string): Promise<AccessToken> {
    const token = uuidv4();
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await this.accessTokenService.findFirst({
      email,
    });

    if (existingToken) {
      await this.accessTokenService.delete(existingToken.id);
    }

    return this.accessTokenService.create({
      email,
      token,
      expiresAt,
    });
  }
}
