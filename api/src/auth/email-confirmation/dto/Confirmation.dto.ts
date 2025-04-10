import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ConfirmationDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
