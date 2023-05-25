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
    return plainToInstance(RecipesDto, recipe);
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
    return recipes as RecipeEntity[];
  }

  public async createRecipe(recipes: RecipesDto): Promise<RecipeEntity> {
    recipes.id = uuid();
    recipes.createdAt = new Date().toISOString();
    recipes.updatedAt = new Date().toISOString();
    await this.dynamoDB
      .put({
        TableName: this.table,
        Item: recipes,
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
          ':recipeName': recipes.recipeName,
          ':description': recipes.description,
          ':ingredients': recipes.ingredients,
          ':preparationMethod': recipes.preparationMethod,
          ':category': recipes.category,
          ':updatedAt': recipes.updatedAt,
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
}
