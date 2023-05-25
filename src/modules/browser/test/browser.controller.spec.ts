import { Test, TestingModule } from '@nestjs/testing';
import { BrowserController } from '../browser.controller';
import { BrowserService } from '../browser.service';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { RecipesService } from '../../recipes/recipes.service';
import RestaurantRepositoryDinamodb from '../../restaurants/adapters/restaurant.repository.dinamodb';
import RecipeRepositoryDinamodb from '../../recipes/adapters/recipe.repository.dinamodb';
import { BrowserInputDto } from '../dto/browser.input.dto';
import { RestaurantCategory } from '../../restaurants/entities/restaurant.entity';
import { BrowserOutputDto } from '../dto/browser.output.dto';

describe('BrowserController', () => {
  let controller: BrowserController;
  let browserService: BrowserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrowserService,
        RestaurantsService,
        RecipesService,
        RestaurantRepositoryDinamodb,
        RecipeRepositoryDinamodb,
      ],
      controllers: [BrowserController],
    }).compile();

    controller = module.get<BrowserController>(BrowserController);
    browserService = module.get<BrowserService>(BrowserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(browserService).toBeDefined();
  });

  it('should return a list', async function () {
    const bodyMock: BrowserInputDto = {
      ingredients: ['ingredient1', 'ingredient2'],
      categories: [RestaurantCategory.OTHER],
    };

    const returnMock: BrowserOutputDto = {
      recipes: [],
      restaurants: [],
    };

    browserService.search = jest.fn().mockResolvedValue(returnMock);
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockResolvedValue(returnMock),
    };
    const recipes = await controller.search(res, bodyMock);
    expect(recipes).toBeDefined();
    expect(recipes).toEqual(returnMock);
  });
});
