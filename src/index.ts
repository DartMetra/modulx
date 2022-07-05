import { TestModule } from './test/test.module';
import { Test1Module } from './test1/test1.module';
import { AppModule } from './app.module';
import { AppFactory } from './lib/AppFactory';
import 'reflect-metadata';
import * as http from 'http';
import * as express from 'express';
import { TestController } from './test/test.controller';
import { TestService } from './test/test.service';
import { SecondService } from './test/second.service';
import { ThirdService } from './test/third.service';

const PORT = process.env.PORT || 3000;

const server = http.createServer(new AppFactory().createApp(AppModule));
//const server = http.createServer(express());
server.listen(PORT, () => {
  console.log(`Server is listening on :${PORT}`);
});

////const c = new TestController(new TestService() as any, new SecondService(), new ThirdService());
//console.log('C test', c.test());
