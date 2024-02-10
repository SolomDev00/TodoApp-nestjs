/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { LinkedinService } from './linkedin.service';

@Controller('linkedin')
export class LinkedinController {
  constructor(private readonly linkedinService: LinkedinService) {}

  @Get('profile')
  async getLinkedinProfile() {
    return this.linkedinService.scrapeProfile();
  }
}
