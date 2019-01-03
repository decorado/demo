export const objectKeysToCamelCase = obj => {

  if (!isPlainObject(obj) && !Array.isArray(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return arrayOfObjectsToCamelCase(obj);
  }

  const camelCaseObject = {};
  Object.keys(obj).forEach(key => {
    const newValue = objectKeysToCamelCase(obj[key]);
    camelCaseObject[key.charAt(0).toLocaleLowerCase() + key.slice(1)] = newValue;
  });

  return camelCaseObject;
};

const arrayOfObjectsToCamelCase = arr => {
  return arr.map(elem => objectKeysToCamelCase(elem));
};

const isPlainObject = obj => {
  return !!obj
    && typeof obj === 'object'
    && Object.prototype.toString.call(obj) === '[object Object]';
};
