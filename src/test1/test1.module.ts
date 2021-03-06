import { Test1Controller } from './test1.controller';
import { Test1Service } from './test1.service';

import { Module } from '../lib/core/decorators';

@Module({
  controllers: [Test1Controller],
  services: [Test1Service],
})
export class Test1Module {}
