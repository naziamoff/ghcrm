import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { PasswordService } from './password/password.service';
import { MailService } from '../mail/mail.service';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';

@Module({
  imports: [forwardRef(() => EmailConfirmationModule)],
  controllers: [AuthController],
  providers: [AuthService, UserService, PasswordService, MailService],
  exports: [AuthService],
})
export class AuthModule {}
