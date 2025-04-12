import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthError } from '../constants';

@Injectable()
export class PasswordService {
  constructor() {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validatePassword(password: string, passwordHash: string) {
    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    if (!isPasswordValid) {
      throw new BadRequestException(AuthError.InvalidCredentials);
    }
  }
}
