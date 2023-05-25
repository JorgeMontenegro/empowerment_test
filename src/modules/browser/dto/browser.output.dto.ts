import { IsObject, IsOptional } from 'class-validator';
import { RecipesDto } from 'modules/recipes/dtos/recipes.dto';
import { RestaurantsDto } from 'modules/restaurants/dtos/restaurants.dto';

export class BrowserOutputDto {
  @IsOptional()
  @IsObject({ each: true, context: RestaurantsDto })
  restaurants?: RestaurantsDto[] = [];

  @IsOptional()
  @IsObject({ each: true, context: RecipesDto })
  recipes?: RecipesDto[] = [];
}
