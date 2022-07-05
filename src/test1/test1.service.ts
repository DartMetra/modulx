import { Injectable } from '../lib/decorators/injectable.decorator';

@Injectable()
export class Test1Service {
  constructor() {
    console.log('TEST SERVICE INITED');
  }
}
