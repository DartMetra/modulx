import 'reflect-metadata';
import { pushToMetaArr } from '../helpers';

export function Inject(name: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    console.log(name, parameterIndex);
    pushToMetaArr('dependencies', { index: parameterIndex, name }, target);
  };
}
