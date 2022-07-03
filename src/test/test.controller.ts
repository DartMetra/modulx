import { NextFunction, Request, Response } from 'express';
import { ApplyMiddleware } from '../lib/decorators/applyMiddleware.decorator';
import { Controller } from '../lib/decorators/controller.decorator';
import { Get } from '../lib/decorators/methods';
import { TestService } from './test.service';

@Controller({ path: '/test' })
@ApplyMiddleware([])
export class TestController {
  constructor(private readonly testService: TestService) {
    console.log('TEST CONTROLLER INITED');
  }

  @ApplyMiddleware([])
  @Get()
  async get(req: Request, res: Response, next: NextFunction) {
    console.log('get test');
    res.send('OMG ITS WORKING');
  }

  @ApplyMiddleware([])
  @Get('/1')
  async get1(req: Request, res: Response, next: NextFunction) {
    console.log('get test1');
    res.send('OMG ITS WORKING X2');
  }
}
