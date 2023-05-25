import { Test, TestingModule } from '@nestjs/testing';
import { RecipesService } from '../recipes.service';
import RecipeRepositoryDinamodb from '../adapters/recipe.repository.dinamodb';
import { RecipesDto } from '../dtos/recipes.dto';
import { RestaurantCategory } from '../../restaurants/entities/restaurant.entity';

describe('RecipesService', () => {
  let service: RecipesService;
  let recipeRepositoryDinamodb: RecipeRepositoryDinamodb;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesService, RecipeRepositoryDinamodb],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
    recipeRepositoryDinamodb = module.get<RecipeRepositoryDinamodb>(
      RecipeRepositoryDinamodb,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(recipeRepositoryDinamodb).toBeDefined();
  });

  it('get all recipes', async function () {
    const returnMock: RecipesDto[] = [
      {
        id: 'id',
        recipeName: 'recipeName',
        description: 'description',
        createdAt: new Date().toISOString(),
        preparationMethod: 'preparationMethod',
        updatedAt: new Date().toISOString(),
        ingredients: ['ingredient1', 'ingredient2'],
        category: [RestaurantCategory.OTHER],
      } as RecipesDto,
    ];
    recipeRepositoryDinamodb.getAllRecipes = jest
      .fn()
      .mockResolvedValue(returnMock);
    const recipes = await service.getAllRecipes();
    expect(recipes).toBeDefined();
    expect(recipes).toEqual(returnMock);
  });

  it('get recipe', async function () {
    const returnMock: RecipesDto = {
      id: 'id',
      recipeName: 'recipeName',
      description: 'description',
      createdAt: new Date().toISOString(),
      preparationMethod: 'preparationMethod',
      updatedAt: new Date().toISOString(),
      ingredients: ['ingredient1', 'ingredient2'],
      category: [RestaurantCategory.OTHER],
    } as RecipesDto;
    recipeRepositoryDinamodb.getRecipe = jest
      .fn()
      .mockResolvedValue(returnMock);
    const recipes = await service.getRecipe('id');
    expect(recipes).toBeDefined();
    expect(recipes).toEqual(returnMock);
  });

  it('create recipe', async function () {
    const returnMock: RecipesDto = {
      id: 'id',
      recipeName: 'recipeName',
      description: 'description',
      createdAt: new Date().toISOString(),
      preparationMethod: 'preparationMethod',
      updatedAt: new Date().toISOString(),
      ingredients: ['ingredient1', 'ingredient2'],
      category: [RestaurantCategory.OTHER],
    } as RecipesDto;
    recipeRepositoryDinamodb.createRecipe = jest
      .fn()
      .mockResolvedValue(returnMock);
    const recipes = await service.createRecipe(returnMock);
    expect(recipes).toBeDefined();
    expect(recipes).toEqual(returnMock);
  });

  it('update recipe', async function () {
    const returnMock: RecipesDto = {
      id: 'id',
      recipeName: 'recipeName',
      description: 'description',
      createdAt: new Date().toISOString(),
      preparationMethod: 'preparationMethod',
      updatedAt: new Date().toISOString(),
      ingredients: ['ingredient1', 'ingredient2'],
      category: [RestaurantCategory.OTHER],
    } as RecipesDto;
    recipeRepositoryDinamodb.updateRecipe = jest
      .fn()
      .mockResolvedValue(returnMock);
    const recipes = await service.updateRecipe('id', returnMock);
    expect(recipes).toBeDefined();
    expect(recipes).toEqual(returnMock);
  });

  it('get recipes by ingredients or category', async function () {
    const returnMock: RecipesDto[] = [
      {
        id: 'id',
        recipeName: 'recipeName',
        description: 'description',
        createdAt: new Date().toISOString(),
        preparationMethod: 'preparationMethod',
        updatedAt: new Date().toISOString(),
        ingredients: ['ingredient1', 'ingredient2'],
        category: [RestaurantCategory.OTHER],
      } as RecipesDto,
    ];
    recipeRepositoryDinamodb.getRecipesByIngredients = jest
      .fn()
      .mockResolvedValue(returnMock);
    const recipes = await service.getRecipesByIngredientsOrCategory(
      ['ingredient1', 'ingredient2'],
      [RestaurantCategory.OTHER],
    );
    expect(recipes).toBeDefined();
    expect(recipes).toEqual(returnMock);
  });
});
