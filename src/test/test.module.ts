import { TestController } from './test.controller';
import { TestService } from './test.service';

import { Module } from '../lib/core/decorators';
import { SecondService } from './second.service';
import { ThirdService } from './third.service';
import { DepService } from './dep.service';

@Module({
  controllers: [TestController],
  services: [TestService, SecondService, ThirdService, DepService],
})
export class TestModule {}
