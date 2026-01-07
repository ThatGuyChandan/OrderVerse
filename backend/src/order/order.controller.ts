import { Controller, Get, Post, Body, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderInput } from './dto/create-order.input';
import { AddOrderItemInput } from './dto/add-order-item.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentUser } from '../auth/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  createOrder(
    @Body() createOrderInput: CreateOrderInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.orderService.create(createOrderInput, user);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.orderService.findAll(user);
  }

  @Post('item')
  addOrderItem(
    @Body() addOrderItemInput: AddOrderItemInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.orderService.addOrderItem(addOrderItemInput, user);
  }

  @Post(':id/checkout')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  checkoutOrder(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.orderService.checkout(id, user);
  }

  @Post(':id/cancel')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  cancelOrder(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.orderService.cancel(id, user);
  }
}
