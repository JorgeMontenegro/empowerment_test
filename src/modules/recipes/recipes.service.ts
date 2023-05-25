import { Injectable } from '@nestjs/common';
import RecipeRepositoryDinamodb from 'modules/recipes/adapters/recipe.repository.dinamodb';
import { RecipesDto } from 'modules/recipes/dtos/recipes.dto';
import { plainToInstance } from 'class-transformer';
import { RestaurantCategory } from 'modules/restaurants/entities/restaurant.entity';

@Injectable()
export class RecipesService {
  constructor(private readonly recipeRepository: RecipeRepositoryDinamodb) {}

  public async getAllRecipes(): Promise<RecipesDto[]> {
    const data = await this.recipeRepository.getAllRecipes();
    return plainToInstance(RecipesDto, data);
  }

  public async getRecipe(id: string): Promise<RecipesDto> {
    return this.recipeRepository.getRecipe(id);
  }

  public async createRecipe(body: RecipesDto): Promise<RecipesDto> {
    return this.recipeRepository.createRecipe(body);
  }

  public async updateRecipe(id: string, body: RecipesDto): Promise<RecipesDto> {
    return this.recipeRepository.updateRecipe(id, body);
  }

  public async getRecipesByIngredientsOrCategory(
    ingredients: string[],
    categories: RestaurantCategory[],
  ): Promise<RecipesDto[]> {
    return this.recipeRepository.getRecipesByIngredients(
      ingredients,
      categories,
    );
  }
}
