import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class MenuItem {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  restaurantId: number;

  @Field(() => Float)
  price: number;
}
