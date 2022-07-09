import { Injectable } from '../lib/decorators/injectable.decorator';

@Injectable()
export class Test2Service {
  constructor() {
    console.log('TEST SERVICE INITED');
  }
}
