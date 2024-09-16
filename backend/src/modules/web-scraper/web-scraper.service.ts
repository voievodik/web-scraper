import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer, { Browser, Page } from 'puppeteer';
import { MAX_PAGES_AMOUNT } from 'src/utils';
import { BidI, BidResponseI, BidsResponseI } from './interfaces/bids.interface';
import { BIDS_MESSAGES } from './messages/bids.messages';

@Injectable()
export class WebScraperService {
  private marylandGovernmentBidsPortal: string;
  private bids: BidI[] = [];

  constructor(private readonly configService: ConfigService) {
    this.marylandGovernmentBidsPortal = configService.get(
      'app.webScraper.marylandGovernmentBidsPortal',
    );
  }

  private async launchBrowser(): Promise<Browser> {
    try {
      return await puppeteer.launch();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async openPage(browser: Browser): Promise<Page> {
    try {
      const page = await browser.newPage();
      await page.goto(this.marylandGovernmentBidsPortal, {
        waitUntil: 'networkidle2',
      });
      return page;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async extractBidData(page: Page): Promise<BidI[]> {
    try {
      return await page.evaluate(() => {
        const rows = Array.from(
          document.querySelectorAll('table#body_x_grid_grd tbody tr'),
        );
        return rows.map((row) => {
          const cells = row.querySelectorAll('td');
          return {
            id: cells[1]?.textContent?.trim() || '',
            title: cells[2]?.textContent?.trim() || '',
            status: cells[3]?.textContent?.trim() || '',
            dueDate: cells[4]?.textContent?.trim() || '',
            publishDate: cells[5]?.textContent?.trim() || '',
            category: cells[6]?.textContent?.trim() || '',
            solicitationType: cells[7]?.textContent?.trim() || '',
            agency: cells[8]?.textContent?.trim() || '',
          };
        });
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async goToNextPage(page: Page): Promise<void> {
    try {
      await page.waitForSelector('button#body_x_grid_PagerBtnNextPage', {
        visible: true,
      });
      await page.click('button#body_x_grid_PagerBtnNextPage');
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async scrapebidsDetails(): Promise<void> {
    let browser: Browser;
    let page: Page;
    let data: BidI[] = [];
    let currentPage = 1;

    try {
      browser = await this.launchBrowser();
      page = await this.openPage(browser);

      while (currentPage <= MAX_PAGES_AMOUNT) {
        await page.waitForSelector('table#body_x_grid_grd tbody tr');
        const results = await this.extractBidData(page);
        data = data.concat(results);

        if (currentPage < MAX_PAGES_AMOUNT) {
          await this.goToNextPage(page);
        }

        currentPage++;
      }

      this.bids = data;
    } catch (error) {
      throw new BadRequestException(error.message);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  public async getBids(id: string): Promise<BidsResponseI> {
    try {
      if (this.bids.length === 0) {
        await this.scrapebidsDetails();
      }

      const filteredBids = this.bids.filter((bid) => bid.id.includes(id));

      return {
        data: {
          bids: filteredBids,
          message: BIDS_MESSAGES.getSuccess,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async getBidById(id: string): Promise<BidResponseI> {
    try {
      if (this.bids.length === 0) {
        await this.scrapebidsDetails();
      }

      const bid = this.bids.find((bid) => bid.id === id);

      return {
        data: {
          bid: bid,
          message: BIDS_MESSAGES.getSuccess,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
