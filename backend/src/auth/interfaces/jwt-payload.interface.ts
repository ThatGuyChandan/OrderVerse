import { Role, Country } from '@prisma/client';

export interface JwtPayload {
  userId: number;
  role: Role;
  country: Country;
}
