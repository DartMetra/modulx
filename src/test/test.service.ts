import { Injectable } from '../lib/core/decorators';

@Injectable()
export class TestService {
  constructor() {
    console.log('TEST SERVICE INITED');
  }

  m() {
    return this.t();
  }
  t() {
    console.log('TESTSERVICE METHOD');
    return 'FIRST';
  }
}
