import { Inject, Injectable } from '../lib/core/decorators';
import { TestService } from './test.service';

@Injectable()
export class DepService {
  constructor(@Inject('TestService') private readonly testService: TestService) {
    console.log('TEST SERVICE INITED');
  }

  mmm() {
    console.log('DEPENDENT SERVICE METHOD');
    console.log(this.testService.m());
    console.log(this.t());
    return 'DEPENDERT';
  }

  t() {
    return 'TTT';
  }
}
