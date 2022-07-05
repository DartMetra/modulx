import { Injectable } from '../lib/decorators/injectable.decorator';

@Injectable()
export class ThirdService {
  constructor() {
    console.log('THIRD SERVICE INITED');
  }

  m() {
    return 'THIRD';
  }
}
