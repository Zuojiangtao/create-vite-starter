/**
 * Recursively merge the content of the new object to the existing one
 *
 * @param {Object} target the existing object
 * @param {Object} obj the new object
 */
export function deepMerge(target: object, obj: object) {
  const isObject = (val: any) => val && typeof val === 'object';
  const mergeArrayWithDedupe = (a: any[], b: any[]) => Array.from(new Set([...a, ...b]));
  for (const key of Object.keys(obj)) {
    // @ts-ignore
    const oldVal = target[key];
    // @ts-ignore
    const newVal = obj[key];

    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      // @ts-ignore
      target[key] = mergeArrayWithDedupe(oldVal, newVal);
    } else if (isObject(oldVal) && isObject(newVal)) {
      // @ts-ignore
      target[key] = deepMerge(oldVal, newVal);
    } else {
      // @ts-ignore
      target[key] = newVal;
    }
  }

  return target;
}

/**
 * Sort packageJson dependencies.
 *
 * @param {any} packageJson - packageJson file stream
 * */
export function sortDependencies(packageJson: any) {
  const sorted = {};

  const depTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];

  for (const depType of depTypes) {
    if (packageJson[depType]) {
      // @ts-ignore
      sorted[depType] = {};

      Object.keys(packageJson[depType])
        .sort()
        .forEach(name => {
          // @ts-ignore
          sorted[depType][name] = packageJson[depType][name];
        });
    }
  }

  return {
    ...packageJson,
    ...sorted,
  };
}
