import { Injectable } from '../lib/decorators/injectable.decorator';

@Injectable()
export class TestService {
  constructor() {
    console.log('TEST SERVICE INITED');
  }

  m() {
    console.log('TESTSERVICE METHOD');
    return 'FIRST';
  }
}
