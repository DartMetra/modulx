import { Injectable } from '../lib/core/decorators';

@Injectable()
export class Test1Service {
  constructor() {
    console.log('TEST SERVICE INITED');
  }
}
