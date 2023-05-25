export enum RestaurantCategory {
  CHINESE = 'chinese',
  ITALIAN = 'italian',
  JAPANESE = 'japanese',
  MEXICAN = 'mexican',
  VEGAN = 'vegan',
  FAST_FOOD = 'fast food',
  OTHER = 'other',
}

export interface RestaurantEntity {
  id: string;
  restaurantName: string;
  description: string;
  address: string;
  phone: string;
  category: RestaurantCategory[];
  createdAt?: string;
  updatedAt?: string;
}
