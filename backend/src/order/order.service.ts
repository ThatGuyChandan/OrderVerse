import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderStatus, Role } from '@prisma/client';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { createRebacWhere } from 'src/auth/rebac.util';
import { AddOrderItemInput } from './dto/add-order-item.input';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  create(createOrderInput: CreateOrderInput, user: JwtPayload) {
    return this.prisma.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          userId: user.userId,
          country: user.country,
          status: OrderStatus.CREATED,
        },
      });

      const orderItems = createOrderInput.orderItems.map((item) =>
        prisma.orderItem.create({
          data: {
            orderId: order.id,
            menuItemId: item.menuItemId,
            quantity: item.quantity,
          },
        }),
      );

      await Promise.all(orderItems);

      return order;
    });
  }

  findAll(user: JwtPayload) {
    const where = createRebacWhere(user);
    return this.prisma.order.findMany({
      where,
      include: {
        orderItems: {
          include: {
            menuItem: true,
          },
        },
        user: true,
      },
    });
  }

  async addOrderItem(addOrderItemInput: AddOrderItemInput, user: JwtPayload) {
    const order = await this.prisma.order.findUnique({
      where: { id: addOrderItemInput.orderId },
    });

    if (!order) {
      throw new UnauthorizedException('Order not found');
    }

    // Enforce ReBAC: ADMIN can access all, others only their country
    if (user.role !== Role.ADMIN && order.country !== user.country) {
      throw new UnauthorizedException(
        `You can only add items to orders in your country (${user.country})`,
      );
    }

    return this.prisma.orderItem.create({
      data: {
        orderId: addOrderItemInput.orderId,
        menuItemId: addOrderItemInput.menuItemId,
        quantity: addOrderItemInput.quantity,
      },
    });
  }

  checkout(id: number, user: JwtPayload) {
    const where = { id, ...createRebacWhere(user) };
    return this.prisma.order.update({
      where,
      data: { status: OrderStatus.PAID },
    });
  }

  cancel(id: number, user: JwtPayload) {
    const where = { id, ...createRebacWhere(user) };
    return this.prisma.order.update({
      where,
      data: { status: OrderStatus.CANCELLED },
    });
  }
}