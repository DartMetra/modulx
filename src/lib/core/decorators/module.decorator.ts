import 'reflect-metadata';
type ModuleMetadata = {
  controllers?: any[];
  services?: any[];
  imports?: any[];
  exports?: any[];
};

export function Module(metadata: ModuleMetadata): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('controllers', metadata.controllers, target);
    Reflect.defineMetadata('services', metadata.services, target);
    Reflect.defineMetadata('imports', metadata.imports, target);
    Reflect.defineMetadata('exports', metadata.exports, target);
    Reflect.defineMetadata('type', 'module', target);
    return target;
  };
}
