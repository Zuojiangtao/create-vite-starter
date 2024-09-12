import path from 'node:path';
import fs from 'node:fs';
import chalk from 'chalk';
import { copyTemplate } from '@/utils/copyTemplate';
import { ejsRender } from '@/utils/ejsRender';
import { DEFAULT_PROJECT_NAME } from '@/config/compile.config';
import { getLanguage } from '@/utils/getLanguage';

function recursiveDeleteFolder(filePath) {
  for (const fileName of fs.readdirSync(filePath)) {
    const fullPath = path.resolve(filePath, fileName);
    if (fs.lstatSync(fullPath).isDirectory()) {
      recursiveDeleteFolder(fullPath);
      continue;
    }
    fs.unlinkSync(fullPath);
  }
}

export default async function create(lang: object, options: Options) {
  const {
    projectName,
    overwrite: shouldOverwrite,
    framework,
    useEslint: needsEslint,
    usePrettier: needsPrettier,
    useHusky: needsHusky,
  } = options;

  const name = projectName || DEFAULT_PROJECT_NAME;
  const filePath = path.resolve(process.cwd(), name);
  const language = getLanguage(lang.language);

  // ================= generate info =================
  console.log();
  console.log(chalk.cyan(`${language.infos.scaffolding} ...`));

  // ================= overwrite =================
  if (fs.existsSync(filePath) && shouldOverwrite) {
    recursiveDeleteFolder(filePath);
  } else if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }

  // ================= copy template =================
  // ========= base =========
  await copyTemplate(path.resolve(__dirname, '../template/base'), filePath);
  // ========= config =========
  // eslint
  if (needsEslint) {
    await copyTemplate(path.resolve(__dirname, '../template/config/eslint'), filePath);
  }
  // prettier
  if (needsPrettier) {
    await copyTemplate(path.resolve(__dirname, '../template/config/prettier'), filePath);
  }
  // husky
  if (needsHusky) {
    await copyTemplate(path.resolve(__dirname, '../template/config/husky'), filePath);
  }
  // ========= vite =========
  await copyTemplate(path.resolve(__dirname, '../template/vite'), filePath);
  // ========= framework =========
  // todo: 完整框架模板逻辑补充 - nuxt\next\koa
  await copyTemplate(path.resolve(__dirname, `../template/${framework}`), filePath);

  // ================= ejs render =================
  // ========= base =========
  await ejsRender(path.resolve(__dirname, '../template/base'), filePath, options);
  // ========= config =========
  // eslint
  if (needsEslint) {
    await ejsRender(path.resolve(__dirname, '../template/config/eslint'), filePath, options);
  }
  // ========= vite =========
  await ejsRender(path.resolve(__dirname, '../template/vite'), filePath, options);
  // ========= framework =========
  await ejsRender(path.resolve(__dirname, `../template/${framework}`), filePath, options);
}
