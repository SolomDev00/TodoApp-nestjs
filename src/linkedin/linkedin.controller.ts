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

  // @Post()
  // async scrapeProfileData(@Body() body: { profileLink: string }): Promise<any> {
  //   const { profileLink } = body;

  //   try {
  //     if (!profileLink) {
  //       throw new Error('Profile link is required');
  //     }

  //     const profileData = await this.linkedinService.scrapeProfile(profileLink);
  //     return profileData;
  //   } catch (error) {
  //     return { error: 'Internal Server Error' };
  //   }
  // }
}
