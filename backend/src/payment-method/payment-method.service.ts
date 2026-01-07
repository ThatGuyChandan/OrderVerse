import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { createRebacWhere } from 'src/auth/rebac.util';

@Injectable()
export class PaymentMethodService {
  constructor(private prisma: PrismaService) {}

  findAll(user: JwtPayload) {
    const where = createRebacWhere(user);
    return this.prisma.paymentMethod.findMany({
      where: {
        user: where,
      },
    });
  }

  update(updatePaymentMethodDto: UpdatePaymentMethodDto) {
    const { id, ...data } = updatePaymentMethodDto;
    return this.prisma.paymentMethod.update({
      where: { id },
      data,
    });
  }
}