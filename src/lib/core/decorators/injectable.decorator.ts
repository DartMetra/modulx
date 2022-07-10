import 'reflect-metadata';
export function Injectable(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('type', 'injectable', target);
    console.log('TARGET', target);
    return target;
  };
}
