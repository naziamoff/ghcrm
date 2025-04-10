import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';


interface CreateUserOptions {
  email: string;
  passwordHash: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {
  }

  create(createUserOptions: CreateUserOptions): Promise<User> {
    return this.prismaService.user.create({
      data: createUserOptions,
    });
  }

  findById(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  updateByPk(id: number, override: Prisma.UserUpdateInput): Promise<User | null> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: override,
    });
  }
}
