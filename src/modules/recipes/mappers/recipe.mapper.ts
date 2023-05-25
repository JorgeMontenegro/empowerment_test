import { RecipeEntity } from '../entities/recipe.entity';

export default class RecipeMapper {
  public static toInputDomain(recipeEntity: RecipeEntity): any {
    if (!recipeEntity) {
      return null;
    }

    return {
      ...recipeEntity,
      ingredients: recipeEntity.ingredients.join(','),
      category: recipeEntity.category.join(','),
    };
  }

  public static toOutputDomain(recipeEntity: any): any {
    if (!recipeEntity) {
      return null;
    }

    return {
      ...recipeEntity,
      ingredients: recipeEntity.ingredients.split(','),
      category: recipeEntity.category.split(','),
    };
  }

  public static toOutputDomainList(recipeEntityList: any[]): any[] {
    if (!recipeEntityList) {
      return null;
    }

    return recipeEntityList.map((recipeEntity) => {
      return this.toOutputDomain(recipeEntity);
    });
  }
}
