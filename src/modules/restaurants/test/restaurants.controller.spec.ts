import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from '../restaurants.controller';
import { RestaurantsService } from '../restaurants.service';
import RestaurantRepositoryDinamodb from '../adapters/restaurant.repository.dinamodb';
import { RestaurantsDto } from '../dtos/restaurants.dto';
import { RestaurantCategory } from '../entities/restaurant.entity';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let restaurantsService: RestaurantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantsService, RestaurantRepositoryDinamodb],
      controllers: [RestaurantsController],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
    restaurantsService = module.get<RestaurantsService>(RestaurantsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(restaurantsService).toBeDefined();
  });

  it('get', async function () {
    const returnMock: RestaurantsDto[] = [
      {
        id: 'id',
        restaurantName: 'restaurantName',
        description: 'description',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: [RestaurantCategory.OTHER],
      } as RestaurantsDto,
    ];
    restaurantsService.getAllRestaurants = jest
      .fn()
      .mockResolvedValue(returnMock);
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockResolvedValue(returnMock),
    };
    const restaurants = await controller.getAllRestaurants(res);
    expect(restaurants).toBeDefined();
    expect(restaurants).toEqual(returnMock);
  });

  it('get by id', async function () {
    const returnMock: RestaurantsDto = {
      id: 'id',
      restaurantName: 'restaurantName',
      description: 'description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: [RestaurantCategory.OTHER],
    } as RestaurantsDto;
    restaurantsService.getRestaurant = jest.fn().mockResolvedValue(returnMock);
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockResolvedValue(returnMock),
    };
    const restaurants = await controller.getRestaurant(res, 'id');
    expect(restaurants).toBeDefined();
    expect(restaurants).toEqual(returnMock);
  });

  it('create', async function () {
    const returnMock: RestaurantsDto = {
      id: 'id',
      restaurantName: 'restaurantName',
      description: 'description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: [RestaurantCategory.OTHER],
    } as RestaurantsDto;
    restaurantsService.createRestaurant = jest
      .fn()
      .mockResolvedValue(returnMock);
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockResolvedValue(returnMock),
    };
    const restaurants = await controller.createRestaurant(res, returnMock);
    expect(restaurants).toBeDefined();
    expect(restaurants).toEqual(returnMock);
  });

  it('update', async function () {
    const returnMock: RestaurantsDto = {
      id: 'id',
      restaurantName: 'restaurantName',
      description: 'description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: [RestaurantCategory.OTHER],
    } as RestaurantsDto;
    restaurantsService.updateRestaurant = jest
      .fn()
      .mockResolvedValue(returnMock);
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockResolvedValue(returnMock),
    };
    const restaurants = await controller.updateRestaurant(
      res,
      'id',
      returnMock,
    );
    expect(restaurants).toBeDefined();
    expect(restaurants).toEqual(returnMock);
  });
});
