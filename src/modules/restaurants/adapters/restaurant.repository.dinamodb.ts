import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { awsConfig } from 'config/aws.config';
import * as AWS from 'aws-sdk';
import { RestaurantsDto } from 'modules/restaurants/dtos/restaurants.dto';
import { plainToInstance } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { RestaurantEntity } from 'modules/restaurants/entities/restaurant.entity';

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
    return plainToInstance(RestaurantsDto, restaurant);
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
    return restaurants as RestaurantEntity[];
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
        Item: restaurants,
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
    restaurants: RestaurantsDto,
  ): Promise<RestaurantEntity> {
    restaurants.updatedAt = new Date().toISOString();
    await this.dynamoDB
      .update({
        TableName: this.table,
        Key: { id },
        UpdateExpression: `set restaurantName = :restaurantName, description = :description, address = :address, phone = :phone, updatedAt = :updatedAt`,
        ExpressionAttributeValues: {
          ':restaurantName': restaurants.restaurantName,
          ':description': restaurants.description,
          ':address': restaurants.address,
          ':phone': restaurants.phone,
          ':updatedAt': restaurants.updatedAt,
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
}
