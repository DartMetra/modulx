import 'reflect-metadata';

export type Route = {
  method: string;
  path: string;
  middleware: Array<string | symbol>;
  handler: string | symbol;
};

function MethodDecoratorFactory(method: string) {
  return (path: string = '/'): MethodDecorator => {
    return (target, propertyKey) => {
      const controller = target.constructor;

      const routes: Route[] = Reflect.hasMetadata('routes', controller)
        ? Reflect.getMetadata('routes', controller)
        : [];

      let middleware: Array<string | symbol> = [];

      if (Reflect.hasMetadata('middleware', controller)) {
        middleware = Reflect.getMetadata('middleware', controller);
      }
      if (Reflect.hasMetadata('middleware', target)) {
        middleware.concat(Reflect.getMetadata('middleware', target));
      }

      routes.push({
        method,
        path,
        middleware,
        handler: propertyKey,
      });

      Reflect.defineMetadata('routes', routes, controller);
    };
  };
}

export const Get = MethodDecoratorFactory('get');
export const Post = MethodDecoratorFactory('post');
export const Patch = MethodDecoratorFactory('patch');
export const Delete = MethodDecoratorFactory('delete');
export const Put = MethodDecoratorFactory('put');
export const Options = MethodDecoratorFactory('options');
export const Head = MethodDecoratorFactory('head');
export const Connect = MethodDecoratorFactory('connect');
export const Trace = MethodDecoratorFactory('trace');
