import { Module } from '@nestjs/common';
import { NetService } from './net.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WsService } from './ws.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [
  ],
  providers: [
    WsService,
    NetService
  ],
})
export class AppModule {}
