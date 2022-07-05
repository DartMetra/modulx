import 'reflect-metadata';

export function pushToMetaArr(metadatakey, metadatavalue, target: Object) {
  const metaArr: any[] = Reflect.hasMetadata(metadatakey, target) ? Reflect.getMetadata(metadatakey, target) : [];

  metaArr.push(metadatavalue);

  Reflect.defineMetadata(metadatakey, metaArr, target);
}
