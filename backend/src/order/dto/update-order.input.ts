import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateOrderInput } from './create-order.input';
import { OrderStatus } from '@prisma/client';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  status?: OrderStatus;
}
