import * as express from 'express';
import { Route } from './decorators/methods';

export class AppFactory {
  createApp(module: any) {
    const app = express();
    app.use(express.json());

    if (Reflect.getMetadata('type', module) == 'module') {
      const controllers = Reflect.getMetadata('controllers', module);
      const services = Reflect.getMetadata('services', module);

      console.log(controllers);
      console.log(services);

      controllers.forEach((controller) => {
        const controllerInstance: any = new controller();

        const basePath: string = Reflect.getMetadata('path', controller);
        const routes: Route[] = Reflect.getMetadata('routes', controller);

        const router = express.Router();

        routes.forEach(({ method, handler, middleware, path }: Route) => {
          router[method](path, controllerInstance[String(handler)]);
        });

        app.use(basePath, router);
      });
    }

    return app;
  }
}
