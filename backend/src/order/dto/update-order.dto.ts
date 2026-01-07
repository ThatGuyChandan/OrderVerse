import { IsInt, IsEnum, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderInput } from './create-order.input';
import { OrderStatus } from '@prisma/client';

export class UpdateOrderDto extends PartialType(CreateOrderInput) {
  @IsInt()
  id: number;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
