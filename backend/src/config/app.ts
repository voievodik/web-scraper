import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  webScraper: {
    marylandGovernmentBidsPortal: process.env.MARYLAND_GOVERNMENT_BIDS_PORTAL,
  },
}));
