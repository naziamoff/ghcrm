import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth.module';
import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';
import { UserService } from '../../user/user.service';
import { MailModule } from '../../mail/mail.module';
import { MailService } from '../../mail/mail.service';
import { AccessTokenService } from '../../accessToken/accessToken.service';

@Module({
  imports: [MailModule, forwardRef(() => AuthModule)],
  controllers: [EmailConfirmationController],
  providers: [
    EmailConfirmationService,
    UserService,
    MailService,
    AccessTokenService,
  ],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
