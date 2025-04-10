import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { EmailConfirmationService } from './email-confirmation.service';
import { ConfirmationDto } from './dto/Confirmation.dto';

@Controller('auth/email-confirmation')
export class EmailConfirmationController {
  public constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async newVerification(
    @Req() req: Request,
    @Query() dto: ConfirmationDto,
  ) {
    return this.emailConfirmationService.newVerification(req, dto);
  }
}
