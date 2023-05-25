import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RestaurantCategory } from 'modules/restaurants/entities/restaurant.entity';

export class BrowserInputDto {
  @IsOptional()
  @IsEnum(RestaurantCategory, { each: true })
  categories?: RestaurantCategory[];

  @IsOptional()
  @IsString({ each: true })
  ingredients?: string[];
}
