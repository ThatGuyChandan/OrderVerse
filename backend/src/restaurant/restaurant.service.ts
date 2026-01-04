import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { createRebacWhere } from 'src/auth/rebac.util';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  findAll(user: JwtPayload) {
    const where = createRebacWhere(user);
    return this.prisma.restaurant.findMany({ where });
  }
}