import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestaurantsModule } from 'modules/restaurants/restaurants.module';
import { RecipesModule } from './modules/recipes/recipes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RestaurantsModule,
    RecipesModule,
  ],
})
export class AppModule {}
