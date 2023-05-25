export default class RestaurantMapper {
  public static toInputDomain(restaurantEntity: any): any {
    if (!restaurantEntity) {
      return null;
    }

    return {
      ...restaurantEntity,
      category: restaurantEntity.category.join(','),
    };
  }

  public static toOutputDomain(restaurantEntity: any): any {
    if (!restaurantEntity) {
      return null;
    }

    return {
      ...restaurantEntity,
      category: restaurantEntity.category.split(','),
    };
  }

  public static toOutputDomainList(restaurantEntityList: any[]): any[] {
    if (!restaurantEntityList) {
      return null;
    }

    return restaurantEntityList.map((restaurantEntity) => {
      return this.toOutputDomain(restaurantEntity);
    });
  }
}
