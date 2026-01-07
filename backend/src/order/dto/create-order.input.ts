import { Type } from 'class-transformer';
import { IsInt, IsArray, ValidateNested } from 'class-validator';

class OrderItemInput {
  @IsInt()
  menuItemId: number;

  @IsInt()
  quantity: number;
}

export class CreateOrderInput {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  orderItems: OrderItemInput[];
}

