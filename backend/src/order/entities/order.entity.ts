import { Country, OrderStatus } from '@prisma/client';

export class Order {
  id: number;
  userId: number;
  country: Country;
  status: OrderStatus;
}
