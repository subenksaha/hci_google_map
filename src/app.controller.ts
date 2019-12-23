import { Controller, Get, Req, Res } from '@nestjs/common';
import {Request, Response} from 'express'

@Controller('/')
export class AppController {

    @Get()
    handleHome(@Req() req: Request, @Res() res: Response) {
        res.sendFile('index.html', { root: process.cwd() })
    }
}
