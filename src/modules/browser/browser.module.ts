/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { BrowserController } from './browser.controller';
import { BrowserService } from './browser.service';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { RecipesModule } from '../recipes/recipes.module';

@Module({
  imports: [RestaurantsModule, RecipesModule],
  controllers: [BrowserController],
  providers: [BrowserService],
  exports: [BrowserService],
})
export class BrowserModule {}
