import mongoose, { ConnectOptions } from 'mongoose';
import { Injectable } from '../lib/core/decorators';

@Injectable()
export class MongooseService {
  private connection;

  constructor(uri: string, options: ConnectOptions = {}) {
    this.setup(uri, options);
  }

  async setup(uri: string, options: ConnectOptions = {}) {
    this.connection = await mongoose.connect(uri, options);
  }
}
