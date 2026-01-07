import { IsString } from 'class-validator';

export class LoginInput {
  @IsString()
  name: string;
}
