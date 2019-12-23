import { Module } from '@nestjs/common';
import { NetService } from './net.service';
import { WsService } from './ws.service';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [
    AppController
  ],
  providers: [
    WsService,
    NetService
  ],
})
export class AppModule {}
