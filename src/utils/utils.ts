/**
 * Recursively merge the content of the new object to the existing one
 *
 * @param {Object} target the existing object
 * @param {Object} obj the new object
 */
export function deepMerge(target, obj) {
  const isObject = val => val && typeof val === 'object';
  const mergeArrayWithDedupe = (a, b) => Array.from(new Set([...a, ...b]));
  for (const key of Object.keys(obj)) {
    const oldVal = target[key];
    const newVal = obj[key];

    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = mergeArrayWithDedupe(oldVal, newVal);
    } else if (isObject(oldVal) && isObject(newVal)) {
      target[key] = deepMerge(oldVal, newVal);
    } else {
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
export function sortDependencies(packageJson) {
  const sorted = {};

  const depTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];

  for (const depType of depTypes) {
    if (packageJson[depType]) {
      sorted[depType] = {};

      Object.keys(packageJson[depType])
        .sort()
        .forEach(name => {
          sorted[depType][name] = packageJson[depType][name];
        });
    }
  }

  return {
    ...packageJson,
    ...sorted,
  };
}
