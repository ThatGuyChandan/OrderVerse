import { IsInt } from 'class-validator';

export class AddOrderItemInput {
  @IsInt()
  orderId: number;

  @IsInt()
  menuItemId: number;

  @IsInt()
  quantity: number;
}
