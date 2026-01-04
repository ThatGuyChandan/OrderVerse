import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Country, OrderStatus } from '@prisma/client';

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});

registerEnumType(Country, {
  name: 'Country',
});

@ObjectType()
export class Order {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => String)
  country: Country;

  @Field(() => String)
  status: OrderStatus;
}
