import { Controller, Get, Param, Query } from '@nestjs/common';
import { WebScraperService } from './web-scraper.service';
import { BidResponseI, BidsResponseI } from './interfaces/bids.interface';

@Controller('web-scraper')
export class WebScraperController {
  constructor(private readonly webScraperService: WebScraperService) {}

  @Get('/bids')
  async getBids(@Query('id') id: string): Promise<BidsResponseI> {
    return await this.webScraperService.getBids(id);
  }

  @Get('/bids/:id')
  async getBidById(@Param('id') id: string): Promise<BidResponseI> {
    return await this.webScraperService.getBidById(id);
  }
}
