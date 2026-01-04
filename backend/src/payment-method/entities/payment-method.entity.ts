import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaymentMethod {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field()
  type: string;
}
