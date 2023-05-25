import RestaurantRepositoryDinamodb from '../adapters/restaurant.repository.dinamodb';
import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsDto } from '../dtos/restaurants.dto';
import { RestaurantCategory } from '../entities/restaurant.entity';
import RestaurantMapper from '../mappers/restaurant.mapper';

describe('RestaurantRepositoryDinamodb', () => {
  let service: RestaurantRepositoryDinamodb;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantRepositoryDinamodb],
    }).compile();

    service = module.get<RestaurantRepositoryDinamodb>(
      RestaurantRepositoryDinamodb,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get restaurant', async function () {
    const returnMock = {
      id: 'id',
      restaurantName: 'restaurantName',
      description: 'description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: ['category'],
    };
    RestaurantMapper.toOutputDomain = jest.fn().mockReturnValue(returnMock);
    const restaurants = await service.getRestaurant('id');
    expect(restaurants).toBeDefined();
  });

  it('get all restaurants', async function () {
    const returnMock = {
      id: 'id',
      restaurantName: 'restaurantName',
      description: 'description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: ['category'],
    };
    RestaurantMapper.toOutputDomainList = jest.fn().mockReturnValue(returnMock);
    const restaurants = await service.getAllRestaurants();
    expect(restaurants).toBeDefined();
  });

  it('create restaurant', async function () {
    const returnMock = {
      id: 'id',
      restaurantName: 'restaurantName',
      description: 'description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: [RestaurantCategory.OTHER],
    } as RestaurantsDto;
    const restaurants = await service.createRestaurant(returnMock);
    expect(restaurants).toBeDefined();
  });

  it('update restaurant', async function () {
    const returnMock = {
      id: 'id',
      restaurantName: 'restaurantName',
      description: 'description',
      phone: 'phone',
      address: 'address',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: [RestaurantCategory.OTHER],
    } as RestaurantsDto;
    service.updateRestaurant = jest.fn().mockReturnValue(returnMock);
    const restaurants = await service.updateRestaurant('id', returnMock);
    expect(restaurants).toBeDefined();
  });

  it('get restaurant by categories -- null', async function () {
    const returnMock = {
      id: 'id',
      restaurantName: 'restaurantName',
      description: 'description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: [RestaurantCategory.OTHER],
    } as RestaurantsDto;
    const restaurants = await service.getRestaurantByCategories(null);
    expect(restaurants).toBeDefined();
    expect(restaurants).toEqual([]);
  });

  it('get restaurant by categories', async function () {
    const returnMock = {
      id: 'id',
      restaurantName: 'restaurantName',
      description: 'description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: [RestaurantCategory.OTHER],
    } as RestaurantsDto;
    service.createQuery = jest
      .fn()
      .mockReturnValue({ filterExpression: '', expressionAttributeValues: '' });

    const restaurants = await service.getRestaurantByCategories(['category']);
    expect(restaurants).toBeDefined();
  });
});
