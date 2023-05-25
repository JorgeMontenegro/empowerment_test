import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RestaurantCategory } from 'modules/restaurants/entities/restaurant.entity';

export class RestaurantsDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  restaurantName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: string;

  @IsEnum(RestaurantCategory, { each: true })
  @IsNotEmpty()
  category: RestaurantCategory[];

  @IsOptional()
  createdAt?: string;

  @IsOptional()
  updatedAt?: string;
}
