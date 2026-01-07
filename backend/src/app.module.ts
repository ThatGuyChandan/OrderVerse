import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { MenuModule } from './menu/menu.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    RestaurantModule,
    OrderModule,
    PaymentMethodModule,
    MenuModule,
  ],
})
export class AppModule {}
