import { IsNumber } from 'class-validator';

export class RefreshProjectDto {
  @IsNumber()
  id: number;

  @IsNumber()
  userId: number;
}
