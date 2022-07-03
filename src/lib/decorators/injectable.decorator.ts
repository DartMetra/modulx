import 'reflect-metadata';
export function Injectable(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('type', 'injectable', target);
    return target;
  };
}
