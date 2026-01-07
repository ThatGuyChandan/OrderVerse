import { IsInt, IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdatePaymentMethodDto {
  @IsInt()
  id: number;

  @IsString()
  @IsOptional()
  type?: string;

  @IsBoolean()
  @IsOptional()
  enabled?: boolean;
}
