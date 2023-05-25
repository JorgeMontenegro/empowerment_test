import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestaurantsModule } from 'modules/restaurants/restaurants.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RestaurantsModule,
  ],
})
export class AppModule {}
