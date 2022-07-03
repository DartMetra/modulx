import 'reflect-metadata';

export function ApplyMiddleware(middleware: any[]): ClassDecorator & MethodDecorator {
  return (target, propertyKey?) => {
    Reflect.defineMetadata('middleware', middleware, target);
  };
}
