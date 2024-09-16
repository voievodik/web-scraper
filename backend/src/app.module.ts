import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebScraperModule } from './modules/web-scraper/web-scraper.module';
import { ConfigModule } from '@nestjs/config';
import { configGlobal } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: configGlobal,
    }),
    WebScraperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
