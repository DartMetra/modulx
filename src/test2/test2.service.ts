import { Injectable } from '../lib/core/decorators';

@Injectable()
export class Test2Service {
  constructor() {
    console.log('TEST SERVICE INITED');
  }
}
