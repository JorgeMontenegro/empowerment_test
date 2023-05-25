import { Controller, Get, Res, Param, Post, Put, Body } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesDto } from './dtos/recipes.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getAllRecipes(@Res() res): Promise<RecipesDto[]> {
    const data = await this.recipesService.getAllRecipes();
    return res.status(200).json(data);
  }

  @Get(':id')
  async getRecipe(@Res() res, @Param('id') id: string): Promise<RecipesDto> {
    const data = await this.recipesService.getRecipe(id);
    return res.status(200).json(data);
  }

  @Post()
  async createRecipe(
    @Res() res,
    @Body() body: RecipesDto,
  ): Promise<RecipesDto> {
    const data = await this.recipesService.createRecipe(body);
    return res.status(200).json(data);
  }

  @Put(':id')
  async updateRecipe(
    @Res() res,
    @Param('id') id: string,
    @Body() body: RecipesDto,
  ): Promise<RecipesDto> {
    const data = await this.recipesService.updateRecipe(id, body);
    return res.status(200).json(data);
  }
}
