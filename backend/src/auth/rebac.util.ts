import { Role, Country } from '@prisma/client';
import { JwtPayload } from './interfaces/jwt-payload.interface';

export const createRebacWhere = (
  user: JwtPayload,
): { country?: Country } | {} => {
  if (user.role === Role.ADMIN) {
    return {};
  }
  return { country: user.country };
};
