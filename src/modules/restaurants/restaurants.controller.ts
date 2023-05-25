import { Body, Controller, Post, Res, Get, Put, Param } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsDto } from './dtos/restaurants.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  async getAllRestaurants(@Res() res): Promise<RestaurantsDto[]> {
    const data = await this.restaurantsService.getAllRestaurants();
    return res.status(200).json(data);
  }

  @Get(':id')
  async getRestaurant(
    @Res() res,
    @Param('id') id: string,
  ): Promise<RestaurantsDto> {
    const data = await this.restaurantsService.getRestaurant(id);
    return res.status(200).json(data);
  }

  @Post()
  async createRestaurant(
    @Res() res,
    @Body() body: RestaurantsDto,
  ): Promise<RestaurantsDto> {
    const data = await this.restaurantsService.createRestaurant(body);
    return res.status(200).json(data);
  }

  @Put(':id')
  async updateRestaurant(
    @Res() res,
    @Param('id') id: string,
    @Body() body: RestaurantsDto,
  ): Promise<RestaurantsDto> {
    const data = await this.restaurantsService.updateRestaurant(id, body);
    return res.status(200).json(data);
  }
}
