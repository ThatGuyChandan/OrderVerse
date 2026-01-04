import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePaymentMethodInput } from './dto/update-payment-method.input';

@Injectable()
export class PaymentMethodService {
  constructor(private prisma: PrismaService) {}

  update(updatePaymentMethodInput: UpdatePaymentMethodInput) {
    const { id, ...data } = updatePaymentMethodInput;
    return this.prisma.paymentMethod.update({
      where: { id },
      data,
    });
  }
}