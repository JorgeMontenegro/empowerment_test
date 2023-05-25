import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { awsConfig } from '../../../config/aws.config';
import * as AWS from 'aws-sdk';
import { RestaurantsDto } from '../dtos/restaurants.dto';
import { plainToInstance } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { RestaurantEntity } from '../entities/restaurant.entity';
import RestaurantMapper from './../mappers/restaurant.mapper';

@Injectable()
export default class RestaurantRepositoryDinamodb {
  private readonly logger = new Logger(RestaurantRepositoryDinamodb.name);
  table = 'restaurants';
  private dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: awsConfig.region,
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
  });

  public async getRestaurant(id: string): Promise<RestaurantEntity> {
    const restaurant = await this.dynamoDB
      .get({
        TableName: this.table,
        Key: { id },
      })
      .promise()
      .then((res) => res.Item as RestaurantEntity)
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException(
          'Error al tratar de obtener el restaurante',
        );
      });
    return plainToInstance(
      RestaurantsDto,
      RestaurantMapper.toOutputDomain(restaurant),
    );
  }

  public async getAllRestaurants(): Promise<RestaurantEntity[]> {
    const restaurants = await this.dynamoDB
      .scan({
        TableName: this.table,
      })
      .promise()
      .then((res) => res.Items)
      .catch((err) => {
        this.logger.error(err);
        return [] as RestaurantEntity[];
      });
    return plainToInstance(
      RestaurantsDto,
      RestaurantMapper.toOutputDomainList(restaurants),
    );
  }

  public async createRestaurant(
    restaurants: RestaurantsDto,
  ): Promise<RestaurantEntity> {
    restaurants.id = uuid();
    restaurants.createdAt = new Date().toISOString();
    restaurants.updatedAt = new Date().toISOString();
    await this.dynamoDB
      .put({
        TableName: this.table,
        Item: RestaurantMapper.toInputDomain(restaurants),
        ReturnValues: 'ALL_OLD',
      })
      .promise()
      .then()
      .catch((err) => {
        this.logger.error(err);
        throw new NotFoundException('No se encontró el restaurante');
      });
    return await this.getRestaurant(restaurants.id);
  }

  public async updateRestaurant(
    id: string,
    restaurant: RestaurantsDto,
  ): Promise<RestaurantEntity> {
    restaurant.updatedAt = new Date().toISOString();
    const restaurantEdit = RestaurantMapper.toInputDomain(restaurant);
    await this.dynamoDB
      .update({
        TableName: this.table,
        Key: { id },
        UpdateExpression: `set restaurantName = :restaurantName, description = :description, address = :address, phone = :phone, updatedAt = :updatedAt`,
        ExpressionAttributeValues: {
          ':restaurantName': restaurantEdit.restaurantName,
          ':description': restaurantEdit.description,
          ':address': restaurantEdit.address,
          ':phone': restaurantEdit.phone,
          ':updatedAt': restaurantEdit.updatedAt,
        },
        ReturnValues: 'ALL_OLD',
      })
      .promise()
      .then()
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException(
          'Error al tratar de actualizar el restaurante',
        );
      });
    return await this.getRestaurant(id);
  }

  public async getRestaurantByCategories(
    categories: string[],
  ): Promise<RestaurantEntity[]> {
    if (!categories) {
      return [];
    }
    const { filterExpression, expressionAttributeValues } =
      await this.createQuery(categories);
    const restaurants = await this.dynamoDB
      .scan({
        TableName: this.table,
        FilterExpression: filterExpression,
        ExpressionAttributeValues: expressionAttributeValues,
      })
      .promise()
      .then((res) => res.Items)
      .catch((err) => {
        this.logger.error(err);
        return [] as RestaurantEntity[];
      });
    return restaurants as RestaurantEntity[];
  }

  public async createQuery(categories: string[] = []): Promise<any> {
    let filterExpression;
    if (categories.length > 0) {
      filterExpression = categories
        .map((category, index) => {
          return `contains(category, :category${index})`;
        })
        .join(' OR ');
    }
    const expressionAttributeValues = {};
    categories.forEach((category, index) => {
      expressionAttributeValues[`:category${index}`] = category;
    });

    return { filterExpression, expressionAttributeValues };
  }
}
