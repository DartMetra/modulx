import { Injectable } from '../lib/decorators/injectable.decorator';

@Injectable()
export class SecondService {
  constructor() {
    console.log('SECOND SERVICE INITED');
  }

  m() {
    return 'SECOND';
  }
}
