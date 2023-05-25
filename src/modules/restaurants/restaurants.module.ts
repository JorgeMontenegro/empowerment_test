/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import RestaurantRepositoryDinamodb from './adapters/restaurant.repository.dinamodb';

@Module({
  providers: [RestaurantsService, RestaurantRepositoryDinamodb],
  controllers: [RestaurantsController],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
