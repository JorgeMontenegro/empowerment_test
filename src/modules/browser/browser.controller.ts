import { Body, Controller, Post, Res } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { BrowserInputDto } from './dto/browser.input.dto';
import { BrowserOutputDto } from './dto/browser.output.dto';

@Controller('browser')
export class BrowserController {
  constructor(private readonly browserService: BrowserService) {}

  @Post()
  async search(
    @Res() res,
    @Body() body: BrowserInputDto,
  ): Promise<BrowserOutputDto> {
    const data = await this.browserService.search(body);
    return res.status(200).json(data);
  }
}
