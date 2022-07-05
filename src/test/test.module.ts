import { TestController } from './test.controller';
import { TestService } from './test.service';

import { Module } from '../lib/decorators/module.decorator';
import { SecondService } from './second.service';
import { ThirdService } from './third.service';

@Module({
  controllers: [TestController],
  services: [TestService, SecondService, ThirdService],
})
export class TestModule {}
