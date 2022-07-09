import { Inject } from '../lib/decorators/inject.decorator';
import { Injectable } from '../lib/decorators/injectable.decorator';
import { TestService } from './test.service';

@Injectable()
export class DepService {
  constructor(@Inject('TestService') private readonly testService: TestService) {
    console.log('TEST SERVICE INITED');
  }

  mmm() {
    console.log('DEPENDENT SERVICE METHOD');
    console.log(this.testService.m());
    return 'DEPENDERT';
  }
}
