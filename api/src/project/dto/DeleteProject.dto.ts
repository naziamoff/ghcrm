import { IsNumber } from 'class-validator';

export class DeleteProjectDto {
  @IsNumber()
  id: number;

  @IsNumber()
  userId: number;
}
