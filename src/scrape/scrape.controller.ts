/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { ScrapeService } from './scrape.service';

@Controller('linkedin')
export class ScrapeController {
  constructor(private readonly linkedinService: ScrapeService) {}

  @Post('scrape')
  async scrapeProfile(@Body() body: { profileURL: string }): Promise<any> {
    const { profileURL } = body;
    const result = await this.linkedinService.scrapeProfile(profileURL);
    return result;
  }
}
