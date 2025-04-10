import { Module } from '@nestjs/common';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { GithubService } from './github/github.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../.env', './env'],
    }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, GithubService, UserService],
})
export class AppModule {
}
