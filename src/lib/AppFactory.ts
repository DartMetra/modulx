import * as express from 'express';
import { Express } from 'express';
import { Route } from './decorators/methods';
import { arrSize } from './helpers';
import { color } from './helpers/logger';

export class AppFactory {
  private app: Express;
  constructor(app?: Express) {
    this.app = app ? app : express();
    console.log(color.green('green'));
    console.log(color.yellow('yellow'));
    console.log(color.red('red'));
    console.log(color.magentaBright('magentaBright'));
    console.log(color.cyanBright('cyanBright'));
  }

  createApp(module: Function) {
    this.app.use(express.json());
    this.initModule(module);

    return this.app;
  }

  initModule(module: Function) {
    console.log('START');
    if (Reflect.getMetadata('type', module) == 'module') {
      console.log(`RESOLVING MODULE [${module.name}]`);

      const controllers = Reflect.getMetadata('controllers', module);
      const services = Reflect.getMetadata('services', module);
      const imports = Reflect.getMetadata('imports', module);

      console.log(`MODULE CONTROLLERS [${module.name}]`, controllers);
      console.log(`MODULE SERVICES [${module.name}]`, services);

      let servicesInstances: any[] = [];

      if (imports && imports[0]) {
        imports.forEach((importedModule) => servicesInstances.concat(this.initModule(importedModule)));
      }

      servicesInstances = this.resolveServices(services);

      if (controllers && controllers[0]) {
        controllers.forEach((controller) => {
          if (Reflect.getMetadata('type', controller) == 'controller') {
            const controllerInst = this.initDependent(controller, servicesInstances);
            this.mountRoutes(controller, controllerInst);
          }
        });
      }

      return servicesInstances;
    }
  }

  resolveServices(services: any[], servicesInstances: any[] = []) {
    let servicesLeft = services;
    services &&
      services.forEach((service) => {
        const dependencyProto: any[] = Reflect.hasMetadata('dependencies', service)
          ? Reflect.getMetadata('dependencies', service)
          : [];

        const dependencies = [];

        servicesInstances &&
          servicesInstances.forEach((serviceInst) => {
            dependencyProto.forEach((i) => {
              if (serviceInst.constructor.name == i.name) {
                dependencies[i.index] = serviceInst;
              }
            });
          });

        if (arrSize(dependencies) === dependencyProto.length) {
          servicesInstances.push(new service(...dependencies));
          servicesLeft.splice(servicesLeft.indexOf(service), 1);
        }
      });

    if (servicesLeft.length === 0) {
      return servicesInstances;
    }

    return this.resolveServices(servicesLeft, servicesInstances);
  }

  initDependent(dependent: any, injectables: any[]) {
    const dependencyIndexes: any[] = Reflect.hasMetadata('dependencies', dependent)
      ? Reflect.getMetadata('dependencies', dependent)
      : [];

    const dependencies = [];

    injectables &&
      injectables.forEach((injectable) => {
        dependencyIndexes.forEach((i) => {
          if (injectable.constructor.name == i.name) {
            dependencies[i.index] = injectable;
          }
        });
      });

    return new dependent(...dependencies);
  }

  mountRoutes(controllerClass: any, controllerInst: any) {
    const basePath: string = Reflect.getMetadata('path', controllerClass);
    const routes: Route[] = Reflect.getMetadata('routes', controllerClass);

    const router = express.Router();
    console.log('CLASS', controllerClass);
    console.log('CLASS ROUTES', routes);
    console.log('CLASS PATH', basePath);
    routes &&
      routes.forEach(({ method, handler, middleware, path }: Route) => {
        router[method](path, ...middleware, controllerInst[String(handler)].bind(controllerInst));
      });

    this.app.use(basePath, router);
  }
}
