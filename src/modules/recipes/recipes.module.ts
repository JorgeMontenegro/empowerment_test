/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import RecipeRepositoryDinamodb from '../recipes/adapters/recipe.repository.dinamodb';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService, RecipeRepositoryDinamodb],
  exports: [RecipesService],
})
export class RecipesModule {}
