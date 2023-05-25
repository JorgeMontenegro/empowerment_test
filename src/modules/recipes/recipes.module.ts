import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import RecipeRepositoryDinamodb from 'modules/recipes/adapters/recipe.repository.dinamodb';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, RecipeRepositoryDinamodb],
})
export class RecipesModule {}