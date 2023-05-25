import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RestaurantCategory } from '../../restaurants/entities/restaurant.entity';

export class RecipesDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  recipeName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString({ each: true })
  ingredients: string[];

  @IsNotEmpty()
  @IsString()
  preparationMethod: string;

  @IsEnum(RestaurantCategory, { each: true })
  @IsNotEmpty()
  category: RestaurantCategory[];

  @IsOptional()
  createdAt?: string;

  @IsOptional()
  updatedAt?: string;
}
