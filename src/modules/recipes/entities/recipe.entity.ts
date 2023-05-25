import { RestaurantCategory } from 'modules/restaurants/entities/restaurant.entity';

export interface RecipeEntity {
  id: string;
  recipeName: string;
  description: string;
  ingredients: string[];
  preparationMethod: string;
  category: RestaurantCategory[];
  createdAt?: string;
  updatedAt?: string;
}
