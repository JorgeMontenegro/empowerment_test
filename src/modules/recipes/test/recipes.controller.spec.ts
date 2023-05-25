import { Test, TestingModule } from '@nestjs/testing';
import { RecipesController } from '../recipes.controller';
import { RecipesService } from '../recipes.service';
import RecipeRepositoryDinamodb from '../adapters/recipe.repository.dinamodb';
import { RecipesDto } from '../dtos/recipes.dto';
import { RestaurantCategory } from '../../restaurants/entities/restaurant.entity';

describe('RecipesController', () => {
  let controller: RecipesController;
  let recipesService: RecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesService, RecipeRepositoryDinamodb],
      controllers: [RecipesController],
    }).compile();

    controller = module.get<RecipesController>(RecipesController);
    recipesService = module.get<RecipesService>(RecipesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(recipesService).toBeDefined();
  });

  it('get', async function () {
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

    recipesService.getAllRecipes = jest.fn().mockResolvedValue(returnMock);
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockResolvedValue(returnMock),
    };
    const recipes = await controller.getAllRecipes(res);
    expect(recipes).toBeDefined();
    expect(recipes).toEqual(returnMock);
  });

  it('get by id', async function () {
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

    recipesService.getRecipe = jest.fn().mockResolvedValue(returnMock);
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockResolvedValue(returnMock),
    };
    const recipes = await controller.getRecipe(res, 'id');
    expect(recipes).toBeDefined();
    expect(recipes).toEqual(returnMock);
  });

  it('create', async function () {
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

    recipesService.createRecipe = jest.fn().mockResolvedValue(returnMock);
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockResolvedValue(returnMock),
    };
    const recipes = await controller.createRecipe(res, returnMock);
    expect(recipes).toBeDefined();
    expect(recipes).toEqual(returnMock);
  });

  it('update by id', async function () {
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

    recipesService.updateRecipe = jest.fn().mockResolvedValue(returnMock);
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockResolvedValue(returnMock),
    };
    const recipes = await controller.updateRecipe(res, 'id', returnMock);
    expect(recipes).toBeDefined();
    expect(recipes).toEqual(returnMock);
  });
});
