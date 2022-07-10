import { Injectable } from '../lib/core/decorators';

@Injectable()
export class SecondService {
  constructor() {
    console.log('SECOND SERVICE INITED');
  }

  m() {
    return 'SECOND';
  }
}
