import { Module } from '@nestjs/common';
import { BrowserController } from './browser.controller';
import { BrowserService } from './browser.service';
import { RestaurantsModule } from 'modules/restaurants/restaurants.module';
import { RecipesModule } from 'modules/recipes/recipes.module';

@Module({
  imports: [RestaurantsModule, RecipesModule],
  controllers: [BrowserController],
  providers: [BrowserService],
})
export class BrowserModule {}
