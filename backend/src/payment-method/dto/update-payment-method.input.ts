import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePaymentMethodInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  type?: string;
}
