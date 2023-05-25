import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { awsConfig } from 'config/aws.config';
import * as AWS from 'aws-sdk';
import { RecipesDto } from 'modules/recipes/dtos/recipes.dto';
import { plainToInstance } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { RecipeEntity } from 'modules/recipes/entities/recipe.entity';
import RecipeMapper from 'modules/recipes/mappers/recipe.mapper';
import { RestaurantCategory } from 'modules/restaurants/entities/restaurant.entity';

@Injectable()
export default class RecipeRepositoryDinamodb {
  private readonly logger = new Logger(RecipeRepositoryDinamodb.name);
  table = 'recipes';
  private dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: awsConfig.region,
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
  });

  public async getRecipe(id: string): Promise<RecipeEntity> {
    const recipe = await this.dynamoDB
      .get({
        TableName: this.table,
        Key: { id },
      })
      .promise()
      .then((res) => res.Item as RecipeEntity)
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('No se encontró la receta');
      });
    return plainToInstance(RecipesDto, RecipeMapper.toOutputDomain(recipe));
  }

  public async getAllRecipes(): Promise<RecipeEntity[]> {
    const recipes = await this.dynamoDB
      .scan({
        TableName: this.table,
      })
      .promise()
      .then((res) => res.Items)
      .catch((err) => {
        this.logger.error(err);
        return [] as RecipeEntity[];
      });
    return plainToInstance(
      RecipesDto,
      RecipeMapper.toOutputDomainList(recipes),
    );
  }

  public async createRecipe(recipes: RecipesDto): Promise<RecipeEntity> {
    recipes.id = uuid();
    recipes.createdAt = new Date().toISOString();
    recipes.updatedAt = new Date().toISOString();
    await this.dynamoDB
      .put({
        TableName: this.table,
        Item: RecipeMapper.toInputDomain(recipes),
      })
      .promise()
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException(
          'Error al tratar de crear la receta',
        );
      });
    return plainToInstance(RecipesDto, recipes);
  }

  public async updateRecipe(
    id: string,
    recipes: RecipesDto,
  ): Promise<RecipeEntity> {
    recipes.updatedAt = new Date().toISOString();
    const recipesEdit = RecipeMapper.toInputDomain(recipes);
    await this.dynamoDB
      .update({
        TableName: this.table,
        Key: { id },
        UpdateExpression: `set
          recipeName = :recipeName,
          description = :description,
          ingredients = :ingredients,
          preparationMethod = :preparationMethod,
          category = :category,
          updatedAt = :updatedAt`,
        ExpressionAttributeValues: {
          ':recipeName': recipesEdit.recipeName,
          ':description': recipesEdit.description,
          ':ingredients': recipesEdit.ingredients,
          ':preparationMethod': recipesEdit.preparationMethod,
          ':category': recipesEdit.category,
          ':updatedAt': recipesEdit.updatedAt,
        },
      })
      .promise()
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException(
          'Error al tratar de actualizar la receta',
        );
      });
    return plainToInstance(RecipesDto, recipes);
  }

  public async getRecipesByIngredients(
    ingredients: string[],
    categories: RestaurantCategory[],
  ): Promise<RecipeEntity[]> {
    if (!ingredients && !categories) {
      return [];
    }
    const { filterExpression, expressionAttributeValues } =
      await this.createQuery(ingredients, categories);
    const recipes = await this.dynamoDB
      .scan({
        TableName: this.table,
        FilterExpression: filterExpression,
        ExpressionAttributeValues: expressionAttributeValues,
      })
      .promise()
      .then((res) => res.Items)
      .catch((err) => {
        this.logger.error(err);
        return [] as RecipeEntity[];
      });
    return RecipeMapper.toOutputDomainList(recipes as RecipeEntity[]);
  }

  public async createQuery(
    ingredients: string[] = [],
    categories: RestaurantCategory[] = [],
  ): Promise<any> {
    let filterExpressionIngredients = [];
    let filterExpressionCategories = [];
    const expressionAttributeValuesIngredients = {};
    if (ingredients.length > 0) {
      filterExpressionIngredients = ingredients.map((item, index) => {
        return `contains(ingredients, :ingredients${index})`;
      });
    }
    ingredients.forEach((item, index) => {
      expressionAttributeValuesIngredients[`:ingredients${index}`] = item;
    });
    if (categories.length > 0) {
      filterExpressionCategories = categories.map((item, index) => {
        return `contains(category, :category${index})`;
      });
    }
    const expressionAttributeValuesCategories = {};
    categories.forEach((item, index) => {
      expressionAttributeValuesCategories[`:category${index}`] = item;
    });

    const filterExpression = filterExpressionIngredients
      .concat(filterExpressionCategories)
      .join(' OR ');
    const expressionAttributeValues = {
      ...expressionAttributeValuesIngredients,
      ...expressionAttributeValuesCategories,
    };
    return { filterExpression, expressionAttributeValues };
  }
}
