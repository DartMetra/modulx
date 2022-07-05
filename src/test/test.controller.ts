import { NextFunction, Request, Response } from 'express';
import { Inject } from '../lib/decorators/inject.decorator';
import { ApplyMiddleware } from '../lib/decorators/applyMiddleware.decorator';
import { Controller } from '../lib/decorators/controller.decorator';
import { Get } from '../lib/decorators/methods';
import { TestService } from './test.service';
import { ThirdService } from './third.service';
import { SecondService } from './second.service';

@Controller({ path: '/test' })
@ApplyMiddleware([])
export class TestController {
  testService: TestService;
  secondService: SecondService;
  thirdService: ThirdService;
  pricol: string;

  constructor(
    @Inject('TestService') testService: TestService,
    @Inject('SecondService') secondService: SecondService,
    @Inject('ThirdService') thirdService: ThirdService
  ) {
    console.log('Cthis', this);
    console.log('TEST CONTROLLER INITED');
    this.pricol = 'yab skazal kekes';

    this.testService = testService;
    this.secondService = secondService;
    this.thirdService = thirdService;

    console.log('Constroller', this.testService);
    console.log('Constroller', this.secondService);
    console.log('Constroller', this.thirdService);
    this.ch();
    console.log(this.testService.m());

    //this.get1 = this.get1.bind(this);
    //  this.get2 = this.get2.bind(this);
    //  this.get3 = this.get3.bind(this);
  }
  ch() {
    console.log('FUNC', this.secondService);
  }

  test() {
    console.log('M this', this);
    console.log(this.pricol);
    return this.testService.m();
  }
  @ApplyMiddleware([])
  @Get('/1')
  get1(req: Request, res: Response, next: NextFunction) {
    console.log('get test1');
    console.log(this.pricol);
    try {
      console.log('THIS', this);
      console.log('TEST', this.testService);
      console.log('METHOD', this.testService.m());
      res.send(this.testService.m());
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
