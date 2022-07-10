import { Test2Service } from './test2.service';

import { Module } from '../lib/core/decorators';

@Module({
  controllers: [],
  services: [Test2Service],
})
export class Test2Module {}
