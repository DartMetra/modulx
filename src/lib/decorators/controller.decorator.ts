import 'reflect-metadata';

type ControllerMetadata = {
  path: string;
};

export function Controller(metadata?: ControllerMetadata): ClassDecorator {
  return (target) => {
    if (metadata && metadata.path) {
      Reflect.defineMetadata('path', metadata.path, target);
    }
    Reflect.defineMetadata('type', 'controller', target);

    return target;
  };
}
