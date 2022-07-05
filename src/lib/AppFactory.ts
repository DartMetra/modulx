import * as express from 'express';
import { Express } from 'express';
import { Route } from './decorators/methods';

export class AppFactory {
  private app: Express;
  constructor(app?: Express) {
    this.app = app ? app : express();
  }

  createApp(module: Function) {
    this.app.use(express.json());
    this.mountRoutes(module);

    return this.app;
  }

  mountRoutes(module: Function) {
    console.log('START');
    if (Reflect.getMetadata('type', module) == 'module') {
      console.log(`RESOLVING MODULE [${module.name}]`);

      const controllers = Reflect.getMetadata('controllers', module);
      const services = Reflect.getMetadata('services', module);
      const imports = Reflect.getMetadata('imports', module);

      const servicesInstances: any[] = [];

      console.log(`MODULE CONTROLLERS [${module.name}]`, controllers);
      console.log(`MODULE SERVICES [${module.name}]`, services);

      if (imports && imports[0]) {
        imports.forEach((importedModule) => this.mountRoutes(importedModule));
      }

      services && services[0] && services.forEach((service) => servicesInstances.push(new service()));

      if (controllers && controllers[0]) {
        controllers.forEach((controller) => {
          if (Reflect.getMetadata('type', controller) == 'controller') {
            const dependencyIndexes: any[] = Reflect.hasMetadata('dependencies', controller)
              ? Reflect.getMetadata('dependencies', controller)
              : [];

            const dependencies = [];

            servicesInstances &&
              servicesInstances.forEach((serviceInst) => {
                dependencyIndexes.forEach((i) => {
                  if (serviceInst.constructor.name == i.name) {
                    dependencies[i.index] = serviceInst;
                  }
                });
              });

            const controllerInstance: any = new controller(...dependencies);

            const basePath: string = Reflect.getMetadata('path', controller);
            const routes: Route[] = Reflect.getMetadata('routes', controller);

            const router = express.Router();

            routes.forEach(({ method, handler, middleware, path }: Route) => {
              router[method](path, controllerInstance[String(handler)].bind(controllerInstance));
            });

            this.app.use(basePath, router);
          }
        });
      }
    }
  }
}
