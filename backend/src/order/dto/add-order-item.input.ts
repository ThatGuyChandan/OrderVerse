import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddOrderItemInput {
  @Field(() => Int)
  orderId: number;

  @Field(() => Int)
  menuItemId: number;

  @Field(() => Int)
  quantity: number;
}
