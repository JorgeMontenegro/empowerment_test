import { Injectable } from '@nestjs/common';
import { RecipesService } from 'modules/recipes/recipes.service';
import { RestaurantsService } from 'modules/restaurants/restaurants.service';
import { BrowserInputDto } from 'modules/browser/dto/browser.input.dto';
import { BrowserOutputDto } from 'modules/browser/dto/browser.output.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BrowserService {
  constructor(
    private readonly restaurantService: RestaurantsService,
    private readonly recipeService: RecipesService,
  ) {}

  public async search(body: BrowserInputDto): Promise<BrowserOutputDto> {
    const { ingredients, categories } = body;
    if (!ingredients && !categories) {
      return plainToInstance(BrowserOutputDto, {
        restaurants: [],
        recipes: [],
      });
    }
    const restaurants = await this.restaurantService.getRestaurantByCategories(
      categories,
    );
    const recipes = await this.recipeService.getRecipesByIngredientsOrCategory(
      ingredients,
      categories,
    );
    return plainToInstance(BrowserOutputDto, { restaurants, recipes });
  }
}
