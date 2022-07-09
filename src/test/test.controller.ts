import { NextFunction, Request, Response } from 'express';
import { Inject } from '../lib/decorators/inject.decorator';
import { ApplyMiddleware } from '../lib/decorators/applyMiddleware.decorator';
import { Controller } from '../lib/decorators/controller.decorator';
import { Get } from '../lib/decorators/methods';
import { TestService } from './test.service';
import { ThirdService } from './third.service';
import { SecondService } from './second.service';
import { DepService } from './dep.service';

@Controller({ path: '/test' })
@ApplyMiddleware([])
export class TestController {
  constructor(
    //@Inject('TestService') private readonly testService: TestService,
    @Inject('DepService') private readonly depService: DepService,
    @Inject('SecondService') private readonly secondService: SecondService,
    @Inject('ThirdService') private readonly thirdService: ThirdService
  ) {
    console.log('TEST CONTROLLER INITED');
  }

  @ApplyMiddleware([])
  @Get('/1')
  get1(req: Request, res: Response, next: NextFunction) {
    console.log('get test1');

    try {
      console.log('THIS', this);
      console.log('SERVICE', this.depService);
      console.log('METHOD', this.depService.mmm());
      res.send(this.depService.mmm());
    } catch (error) {
      console.log(error);
    }
  }
  @ApplyMiddleware([])
  @Get('/2')
  async get2(req: Request, res: Response, next: NextFunction) {
    console.log('get test2');
    console.log(this.secondService);
    res.send(this.secondService.m());
  }
  @ApplyMiddleware([])
  @Get('/3')
  async get3(req: Request, res: Response, next: NextFunction) {
    console.log('get test3');
    res.send(this.thirdService.m());
  }
}
