import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfirmationTemplate } from './emailTemplates/emailConfirmation.template';

@Injectable()
export class MailService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendConfirmationEmail(
    email: string,
    token: string,
  ): Promise<void> {
    const domain = this.configService.getOrThrow<string>('FE_URL');

    await this.sendEmail(
      email,
      'Email confirmation',
      ConfirmationTemplate({ domain, token, email }),
    );
  }

  private sendEmail(email: string, subject: string, html: string) {
    return this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }
}
