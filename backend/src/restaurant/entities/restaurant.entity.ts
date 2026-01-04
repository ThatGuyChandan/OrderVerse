import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Country } from '@prisma/client';

@ObjectType()
export class Restaurant {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => String)
  country: Country;
}
