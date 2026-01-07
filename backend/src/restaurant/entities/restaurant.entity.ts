import { Country } from '@prisma/client';

export class Restaurant {
  id: number;
  name: string;
  address: string;
  country: Country;
}
