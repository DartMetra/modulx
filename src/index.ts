import { TestModule } from './test/test.module';
import { AppFactory } from './lib/AppFactory';
import 'reflect-metadata';
import * as http from 'http';
import * as express from 'express';

const PORT = process.env.PORT || 3000;

const server = http.createServer(new AppFactory().createApp(TestModule));
//const server = http.createServer(express());
server.listen(PORT, () => {
  console.log(`Server is listening on :${PORT}`);
});
