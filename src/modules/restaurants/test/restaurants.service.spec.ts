import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from '../restaurants.service';
import RestaurantRepositoryDinamodb from '../adapters/restaurant.repository.dinamodb';
import { RestaurantsDto } from '../dtos/restaurants.dto';
import { RestaurantCategory } from '../entities/restaurant.entity';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let repositoryDinamodb: RestaurantRepositoryDinamodb;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantsService, RestaurantRepositoryDinamodb],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    repositoryDinamodb = module.get<RestaurantRepositoryDinamodb>(
      RestaurantRepositoryDinamodb,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryDinamodb).toBeDefined();
  });

  it('get all restaurants', async () => {
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
    repositoryDinamodb.getAllRestaurants = jest
      .fn()
      .mockResolvedValue(returnMock);
    const restaurants = await service.getAllRestaurants();
    expect(restaurants).toBeDefined();
    expect(restaurants).toEqual(returnMock);
  });

  it('get restaurant', async () => {
    const returnMock: RestaurantsDto = {
      id: 'id',
      restaurantName: 'restaurantName',
      description: 'description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: [RestaurantCategory.OTHER],
    } as RestaurantsDto;
    repositoryDinamodb.getRestaurant = jest.fn().mockResolvedValue(returnMock);
    const restaurants = await service.getRestaurant('id');
    expect(restaurants).toBeDefined();
    expect(restaurants).toEqual(returnMock);
  });

  it('create restaurant', async () => {
    const returnMock: RestaurantsDto = {
      id: 'id',
      restaurantName: 'restaurantName',
      description: 'description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: [RestaurantCategory.OTHER],
    } as RestaurantsDto;
    repositoryDinamodb.createRestaurant = jest
      .fn()
      .mockResolvedValue(returnMock);
    const restaurants = await service.createRestaurant(returnMock);
    expect(restaurants).toBeDefined();
    expect(restaurants).toEqual(returnMock);
  });

  it('update restaurant', async () => {
    const returnMock: RestaurantsDto = {
      id: 'id',
      restaurantName: 'restaurantName',
      description: 'description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: [RestaurantCategory.OTHER],
    } as RestaurantsDto;
    repositoryDinamodb.updateRestaurant = jest
      .fn()
      .mockResolvedValue(returnMock);
    const restaurants = await service.updateRestaurant('id', returnMock);
    expect(restaurants).toBeDefined();
    expect(restaurants).toEqual(returnMock);
  });

  it('get restaurant by categories', async () => {
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
    repositoryDinamodb.getRestaurantByCategories = jest
      .fn()
      .mockResolvedValue(returnMock);
    const restaurants = await service.getRestaurantByCategories(['category']);
    expect(restaurants).toBeDefined();
    expect(restaurants).toEqual(returnMock);
  });
});
