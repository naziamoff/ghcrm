import { Injectable } from '@nestjs/common';
import { AccessToken, Prisma } from '@prisma/client';
import { CreateTokenDto } from './dto/CreateTokenDto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccessTokenService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {
  }

  create(createTokenDto: CreateTokenDto): Promise<AccessToken> {
    return this.prismaService.accessToken.create({
      data: createTokenDto,
    });
  }

  delete(id: number): Promise<AccessToken> {
    return this.prismaService.accessToken.delete({
      where: { id },
    });
  }

  findFirst(whereOptions: Prisma.AccessTokenWhereInput): Promise<AccessToken | null> {
    return this.prismaService.accessToken.findFirst({
      where: whereOptions,
    });
  }
}
