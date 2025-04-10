import { ConfirmationTemplateOptions } from './interfaces/ConfirmationTemplateOptions';

export function ConfirmationTemplate({
  domain,
  token,
  email,
}: ConfirmationTemplateOptions): string {
  const confirmLink = `${domain}/auth/email-confirmation?token=${token}&email=${email}`;

  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: black;
          }
          .email-container {
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
          }
          h1 {
            color: #333;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h1>Email Confirmation</h1>
          <p>Hello! To confirm your email address, please click the link below:</p>
          <p><a href="${confirmLink}">Confirm Email</a></p>
          <p>This link is valid for 1 hour. If you did not request confirmation, simply ignore this message.</p>
        </div>
      </body>
    </html>
  `;
}
