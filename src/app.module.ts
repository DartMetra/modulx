import { Module } from './lib/core/decorators';
import { TestModule } from './test/test.module';
import { Test1Module } from './test1/test1.module';

@Module({
  imports: [TestModule],
  controllers: [],
  services: [],
})
export class AppModule {}
