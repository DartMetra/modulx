import 'reflect-metadata';

type ControllerMetadata = {
  path?: string;
  version?: number;
};

export function Controller(metadata?: ControllerMetadata): ClassDecorator {
  return (target) => {
    if (metadata) {
      if (metadata.path) {
        Reflect.defineMetadata('path', metadata.path, target);
      }
      if (metadata.version) {
        Reflect.defineMetadata('version', metadata.version, target);
      }
    }

    Reflect.defineMetadata('type', 'controller', target);

    return target;
  };
}
