import { Test2Service } from './test2.service';

import { Module } from '../lib/decorators/module.decorator';

@Module({
  controllers: [],
  services: [Test2Service],
})
export class Test2Module {}
