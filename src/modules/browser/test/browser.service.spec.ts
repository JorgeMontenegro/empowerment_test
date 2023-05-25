import { Test, TestingModule } from '@nestjs/testing';
import { BrowserService } from '../browser.service';
import { RecipesService } from '../../recipes/recipes.service';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { BrowserInputDto } from '../dto/browser.input.dto';
import { RestaurantCategory } from '../../restaurants/entities/restaurant.entity';
import { BrowserOutputDto } from '../dto/browser.output.dto';
import RecipeRepositoryDinamodb from '../../recipes/adapters/recipe.repository.dinamodb';
import RestaurantRepositoryDinamodb from '../../restaurants/adapters/restaurant.repository.dinamodb';

describe('BrowserService', () => {
  let service: BrowserService;
  let recipesService: RecipesService;
  let restaurantsService: RestaurantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrowserService,
        RecipesService,
        RestaurantsService,
        RecipeRepositoryDinamodb,
        RestaurantRepositoryDinamodb,
      ],
    }).compile();

    service = module.get<BrowserService>(BrowserService);
    recipesService = module.get<RecipesService>(RecipesService);
    restaurantsService = module.get<RestaurantsService>(RestaurantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(recipesService).toBeDefined();
    expect(restaurantsService).toBeDefined();
  });

  it('should return a list of recipes', async () => {
    const bodyMock: BrowserInputDto = {
      ingredients: ['ingredient1', 'ingredient2'],
      categories: [RestaurantCategory.OTHER],
    };
    const returnMock: BrowserOutputDto = {
      recipes: [],
      restaurants: [],
    };
    recipesService.getRecipesByIngredientsOrCategory = jest
      .fn()
      .mockResolvedValue([]);
    restaurantsService.getRestaurantByCategories = jest
      .fn()
      .mockResolvedValue([]);
    const recipes = await service.search(bodyMock);
    expect(recipes).toBeDefined();
    expect(recipes).toEqual(returnMock);
  });

  it('should return a list of recipes - null', async () => {
    const bodyMock: BrowserInputDto = {};
    const returnMock: BrowserOutputDto = {
      recipes: [],
      restaurants: [],
    };
    recipesService.getRecipesByIngredientsOrCategory = jest
      .fn()
      .mockResolvedValue([]);
    restaurantsService.getRestaurantByCategories = jest
      .fn()
      .mockResolvedValue([]);
    const recipes = await service.search(bodyMock);
    expect(recipes).toBeDefined();
    expect(recipes).toEqual(returnMock);
  });
});
