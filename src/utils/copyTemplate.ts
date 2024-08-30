import path from 'node:path';
import fs from 'node:fs';

import { deepMerge, sortDependencies } from './utils';

/**
 * copy template without ejs file
 *
 * @param {string} src - source filename to copy
 * @param {string} dest - destination filename of the copy operation
 * @param {function} [callback]
 * @returns {Promise}
 * */
export async function copyTemplate(src: string, dest: string, callback: void): Promise<void> {
  const fileName = path.basename(src);
  const extName = path.extname(src);

  if (fs.statSync(src).isDirectory()) {
    // ================= skip node_modules file =================
    if (fileName === 'node_modules') return;
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      await copyTemplate(path.resolve(src, file), path.resolve(dest, file), callback);
    }
    return;
  }

  // ================= skip ejs file =================
  if (extName === '.ejs') return;

  // ================= json file copy =================
  const jsonWriteFile = dest => {
    const existing = JSON.parse(fs.readFileSync(dest, 'utf8'));
    const newPackage = JSON.parse(fs.readFileSync(src, 'utf8'));
    return deepMerge(existing, newPackage);
  };

  if (fileName === 'package.json' && fs.existsSync(dest)) {
    const pkg = jsonWriteFile(dest);
    fs.writeFileSync(dest, JSON.stringify(sortDependencies(pkg), null, 2) + '\n');
    return;
  }

  if (fileName === 'extensions.json' && fs.existsSync(dest)) {
    const extensions = jsonWriteFile(dest);
    fs.writeFileSync(dest, JSON.stringify(extensions, null, 2) + '\n');
    return;
  }

  if (fileName === 'settings.json' && fs.existsSync(dest)) {
    const settings = jsonWriteFile(dest);
    fs.writeFileSync(dest, JSON.stringify(settings, null, 2) + '\n');
    return;
  }

  // ================= other file copy =================
  fs.copyFileSync(src, dest);
}
