import RecipeRepositoryDinamodb from '../adapters/recipe.repository.dinamodb';
import { Test, TestingModule } from '@nestjs/testing';
import { RecipesDto } from '../dtos/recipes.dto';
import { RestaurantCategory } from '../../restaurants/entities/restaurant.entity';

describe('RecipeRepositoryDinamodb', () => {
  let service: RecipeRepositoryDinamodb;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeRepositoryDinamodb],
    }).compile();

    service = module.get<RecipeRepositoryDinamodb>(RecipeRepositoryDinamodb);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
    const recipes = await service.getRecipe('id');
    expect(recipes).toBeDefined();
  });

  it('get all recipes', async function () {
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
    const recipes = await service.getAllRecipes();
    expect(recipes).toBeDefined();
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
    const recipes = await service.createRecipe(returnMock);
    expect(recipes).toBeDefined();
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
    const recipes = await service.updateRecipe('id', returnMock);
    expect(recipes).toBeDefined();
  });

  it('get recipes by ingredients -- null', async function () {
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

    const recipes = await service.getRecipesByIngredients(null, null);
    expect(recipes).toBeDefined();
    expect(recipes).toEqual([]);
  });

  it('get recipes by ingredients', async function () {
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

    service.createQuery = jest
      .fn()
      .mockReturnValue({ filterExpression: '', expressionAttributeValues: '' });
    const recipes = await service.getRecipesByIngredients(
      ['ingredient1'],
      [RestaurantCategory.OTHER],
    );
    expect(recipes).toBeDefined();
  });

  it('create query', async function () {
    const returnMock = {
      filterExpression:
        'contains(ingredients, :ingredients0) OR contains(category, :category0)',
      expressionAttributeValues: {
        ':ingredients0': 'ingredient1',
        ':category0': RestaurantCategory.OTHER,
      },
    };
    const recipes = await service.createQuery(
      ['ingredient1'],
      [RestaurantCategory.OTHER],
    );
    expect(recipes).toBeDefined();
    expect(recipes).toEqual(returnMock);
  });
});
