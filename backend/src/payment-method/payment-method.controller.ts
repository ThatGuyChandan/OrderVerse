import { Controller, Patch, Body, UseGuards, Get } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentUser } from '../auth/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Controller('payment-methods')
export class PaymentMethodController {
  constructor(
    private readonly paymentMethodService: PaymentMethodService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  findAll(@CurrentUser() user: JwtPayload) {
    return this.paymentMethodService.findAll(user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updatePaymentMethod(
    @Body()
    updatePaymentMethodInput: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodService.update(updatePaymentMethodInput);
  }
}
