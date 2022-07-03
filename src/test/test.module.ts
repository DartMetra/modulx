import { TestController } from './test.controller';
import { TestService } from './test.service';

import { Module } from '../lib/decorators/module.decorator';

@Module({
  controllers: [TestController],
  services: [TestService],
})
export class TestModule {}
