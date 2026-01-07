import { PrismaClient, Role, Country } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data in correct order to avoid foreign key constraints
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.paymentMethod.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.restaurant.deleteMany({});
  await prisma.user.deleteMany({});

  // Seed Users
  await Promise.all(
    [
      { name: 'Nick Fury', role: Role.ADMIN, country: Country.AMERICA },
      { name: 'Captain Marvel', role: Role.MANAGER, country: Country.INDIA },
      { name: 'Captain America', role: Role.MANAGER, country: Country.AMERICA },
      { name: 'Thanos', role: Role.MEMBER, country: Country.INDIA },
      { name: 'Thor', role: Role.MEMBER, country: Country.INDIA },
      { name: 'Travis', role: Role.MEMBER, country: Country.AMERICA },
    ].map((user) =>
      prisma.user.upsert({
        where: { name: user.name },
        update: {},
        create: user,
      }),
    ),
  );

  // Seed Restaurants
  const restaurantIndia = await prisma.restaurant.upsert({
    where: { name: 'Taj-Mahal Restaurant' },
    update: {},
    create: {
      name: 'Taj-Mahal Restaurant',
      country: Country.INDIA,
    },
  });

  const restaurantAmerica = await prisma.restaurant.upsert({
    where: { name: 'Statue of Liberty Diner' },
    update: {},
    create: {
      name: 'Statue of Liberty Diner',
      country: Country.AMERICA,
    },
  });

  // Seed Menu Items
  await prisma.menuItem.createMany({
    data: [
      // Indian Restaurant Menu
      { restaurantId: restaurantIndia.id, name: 'Butter Chicken', description: 'Creamy tomato-based curry with tender chicken pieces.', price: 12.99 },
      { restaurantId: restaurantIndia.id, name: 'Paneer Tikka Masala', description: 'Marinated paneer cheese in a spiced gravy.', price: 11.50 },
      { restaurantId: restaurantIndia.id, name: 'Dal Makhani', description: 'Slow-cooked black lentils in a rich, creamy sauce.', price: 9.75 },
      { restaurantId: restaurantIndia.id, name: 'Chicken Biryani', description: 'Fragrant basmati rice cooked with chicken and spices.', price: 14.25 },
      { restaurantId: restaurantIndia.id, name: 'Garlic Naan', description: 'Soft flatbread infused with garlic.', price: 3.00 },

      // American Restaurant Menu
      { restaurantId: restaurantAmerica.id, name: 'Classic Burger', description: 'Beef patty with lettuce, tomato, onion, and pickles.', price: 9.99 },
      { restaurantId: restaurantAmerica.id, name: 'BBQ Ribs', description: 'Slow-cooked pork ribs with a smoky BBQ glaze.', price: 18.75 },
      { restaurantId: restaurantAmerica.id, name: 'Caesar Salad', description: 'Crisp romaine lettuce, croutons, parmesan, and Caesar dressing.', price: 8.50 },
      { restaurantId: restaurantAmerica.id, name: 'Fried Chicken Platter', description: 'Crispy fried chicken with a side of mashed potatoes.', price: 13.50 },
      { restaurantId: restaurantAmerica.id, name: 'Apple Pie', description: 'Warm apple pie with a scoop of vanilla ice cream.', price: 6.25 },
    ],
  });

  // Seed Payment Methods
  const users = await prisma.user.findMany();
  for (const user of users) {
    await prisma.paymentMethod.createMany({
      data: [
        { userId: user.id, type: 'Credit Card', enabled: true },
        { userId: user.id, type: 'PayPal', enabled: true },
      ],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
