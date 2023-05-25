import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import RestaurantRepositoryDinamodb from 'modules/restaurants/adapters/restaurant.repository.dinamodb';

@Module({
  providers: [RestaurantsService, RestaurantRepositoryDinamodb],
  exports: [RestaurantsService],
  controllers: [RestaurantsController],
})
export class RestaurantsModule {}
