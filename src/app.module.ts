import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestaurantsModule } from 'modules/restaurants/restaurants.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { BrowserModule } from './modules/browser/browser.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RestaurantsModule,
    RecipesModule,
    BrowserModule,
  ],
})
export class AppModule {}
