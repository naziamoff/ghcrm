import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import connectMongo from 'connect-mongo';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(
    session({
      secret: config.getOrThrow<string>('SESSION_SECRET'),
      name: config.getOrThrow<string>('SESSION_NAME'),
      resave: true,
      saveUninitialized: false,
      cookie: {
        domain: config.getOrThrow<string>('SESSION_DOMAIN'),
        maxAge: 2592000000,
        httpOnly: Boolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
        secure: false,
        sameSite: 'lax',
      },
      store: connectMongo.create({
        mongoUrl: config.getOrThrow<string>('MONGODB_URI'),
        collectionName: config.getOrThrow<string>('SESSION_FOLDER'),
      }),
    }),
  );

  app.enableCors({
    origin: config.getOrThrow<string>('FE_URL'),
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  const port = config.getOrThrow<number>('API_PORT');

  await app.listen(port);

  const serverUrl = `http://localhost:${port}`;
  console.log(`🚀 API is running on: ${serverUrl}`);
}

bootstrap();
