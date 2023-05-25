import { Body, Controller, Post, Res } from '@nestjs/common';
import { BrowserService } from 'modules/browser/browser.service';
import { BrowserInputDto } from 'modules/browser/dto/browser.input.dto';
import { BrowserOutputDto } from 'modules/browser/dto/browser.output.dto';

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
