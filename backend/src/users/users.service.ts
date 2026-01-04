import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByName(name: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { name } });
  }
}
