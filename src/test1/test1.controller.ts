import { NextFunction, Request, Response } from 'express';
import { ApplyMiddleware, Controller, Get, Inject } from '../lib/core/decorators';

import { Test1Service } from './test1.service';

@Controller({ path: '/test1' })
@ApplyMiddleware([])
export class Test1Controller {
  constructor(@Inject('Test1Service') private readonly testService: Test1Service) {
    console.log('TEST1 CONTROLLER INITED');
  }

  @ApplyMiddleware([])
  @Get()
  async get(req: Request, res: Response, next: NextFunction) {
    console.log('get test1 t');
    res.send('OMG ITS WORKING test');
  }

  @ApplyMiddleware([])
  @Get('/1')
  async get1(req: Request, res: Response, next: NextFunction) {
    console.log('get test1 t1');
    res.send('OMG ITS WORKING X2 test');
  }
}
