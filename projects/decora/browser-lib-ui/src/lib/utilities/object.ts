export const objectKeysToLowerCamelCase = (obj: any) => transformObjectKeys(obj, true);

export const objectKeysToUpperCamelCase = (obj: any) => transformObjectKeys(obj, false);

const transformArrayOfObjects = (arr: any[], isLowerCase: boolean) =>
  arr.map(elem => transformObjectKeys(elem, isLowerCase));


const isPlainObject = (obj: any) => {
  return !!obj
    && typeof obj === 'object'
    && Object.prototype.toString.call(obj) === '[object Object]';
};

const transformObjectKeys = (obj: any, isLowerCase: boolean) => {
  if (!isPlainObject(obj) && !Array.isArray(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return transformArrayOfObjects(obj, isLowerCase);
  }

  const transformedObject = {};
  Object.keys(obj).forEach(key => {

    const newValue = transformObjectKeys(obj[key], isLowerCase);

    if (key.length > 1) {

      if (isLowerCase) {
        transformedObject[key.charAt(0).toLocaleLowerCase() + key.slice(1)] = newValue;
      } else {
        transformedObject[key.charAt(0).toLocaleUpperCase() + key.slice(1)] = newValue;
      }

    } else {
      transformedObject[key] = newValue;
    }

  });

  return transformedObject;
};
