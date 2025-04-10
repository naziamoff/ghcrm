import { IsDate, IsEmail, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsEmail()
  email: string;

  @IsString()
  token: string;

  @IsDate()
  expiresAt: Date;
}
