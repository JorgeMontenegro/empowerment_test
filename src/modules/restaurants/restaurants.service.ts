import { Injectable } from '@nestjs/common';
import { RestaurantsDto } from './dtos/restaurants.dto';
import RestaurantRepositoryDinamodb from './adapters/restaurant.repository.dinamodb';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly restaurantRepository: RestaurantRepositoryDinamodb,
  ) {}

  public async getAllRestaurants(): Promise<RestaurantsDto[]> {
    const data = await this.restaurantRepository.getAllRestaurants();
    return plainToInstance(RestaurantsDto, data);
  }

  public async getRestaurant(id: string): Promise<RestaurantsDto> {
    return this.restaurantRepository.getRestaurant(id);
  }

  public async createRestaurant(body: RestaurantsDto): Promise<RestaurantsDto> {
    return this.restaurantRepository.createRestaurant(body);
  }

  public async updateRestaurant(
    id: string,
    body: RestaurantsDto,
  ): Promise<RestaurantsDto> {
    return this.restaurantRepository.updateRestaurant(id, body);
  }

  public async getRestaurantByCategories(
    categories: string[],
  ): Promise<RestaurantsDto[]> {
    return this.restaurantRepository.getRestaurantByCategories(categories);
  }
}
