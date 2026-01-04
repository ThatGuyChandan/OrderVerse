import { PrismaClient, Role, Country } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  await prisma.user.createMany({
    data: [
      { name: 'Nick Fury', role: Role.ADMIN, country: Country.AMERICA },
      { name: 'Captain Marvel', role: Role.MANAGER, country: Country.INDIA },
      { name: 'Captain America', role: Role.MANAGER, country: Country.AMERICA },
      { name: 'Thanos', role: Role.MEMBER, country: Country.INDIA },
      { name: 'Thor', role: Role.MEMBER, country: Country.INDIA },
      { name: 'Travis', role: Role.MEMBER, country: Country.AMERICA },
    ],
  });

  // Seed Restaurants
  const restaurantIndia = await prisma.restaurant.create({
    data: {
      name: 'Taj-Mahal Restaurant',
      country: Country.INDIA,
    },
  });

  const restaurantAmerica = await prisma.restaurant.create({
    data: {
      name: 'Statue of Liberty Diner',
      country: Country.AMERICA,
    },
  });

  // Seed Menu Items
  await prisma.menuItem.createMany({
    data: [
      // Indian Restaurant Menu
      { restaurantId: restaurantIndia.id, price: 12.99 },
      { restaurantId: restaurantIndia.id, price: 15.99 },
      { restaurantId: restaurantIndia.id, price: 8.50 },

      // American Restaurant Menu
      { restaurantId: restaurantAmerica.id, price: 9.99 },
      { restaurantId: restaurantAmerica.id, price: 12.50 },
      { restaurantId: restaurantAmerica.id, price: 5.99 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
