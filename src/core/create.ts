import path from 'node:path';
import fs from 'node:fs';
import { copyTemplate } from '@/utils/copyTemplate';
import { ejsRender } from '@/utils/ejsRender';
import { DEFAULT_PROJECT_NAME } from '@/config/compile.config';

export default async function create(options: Options) {
  console.log(options);
  const {
    projectName,
    overwrite: shouldOverwrite,
    framework,
    useTypeScript: needsTypeScript,
    useJsx: needsJsx,
    useRouter: needsRouter,
    usePinia: needsPinia,
    useEslint: needsEslint,
    usePrettier: needsPrettier,
    useVitest: needsVitest,
    useHusky: needsHusky,
  } = options;

  const name = projectName || DEFAULT_PROJECT_NAME;
  const fileNamePath = path.resolve(process.cwd(), name);

  // ================= overwrite =================
  if (fs.existsSync(fileNamePath) && shouldOverwrite) {
    fs.writeFileSync(fileNamePath, '');
  } else if (!fs.existsSync(fileNamePath)) {
    fs.mkdirSync(fileNamePath);
  }

  // ================= copy template =================
  // ========= base =========
  await copyTemplate(path.resolve(__dirname, '../template/base'), fileNamePath);
  // ========= config =========
  // eslint
  if (needsEslint) {
    await copyTemplate(path.resolve(__dirname, '../template/config/eslint'), fileNamePath);
  }
  // prettier
  if (needsPrettier) {
    await copyTemplate(path.resolve(__dirname, '../template/config/prettier'), fileNamePath);
  }
  // husky
  if (needsHusky) {
    await copyTemplate(path.resolve(__dirname, '../template/config/husky'), fileNamePath);
  }
  // ========= framework =========
  // todo: 完整框架模板逻辑补充 - react\nuxt\next\koa
  await copyTemplate(path.resolve(__dirname, `../template/${framework}`), fileNamePath);

  // ================= ejs render =================
  // ========= base =========
  await ejsRender(path.resolve(__dirname, '../template/base'), fileNamePath, options);
  // ========= framework =========
  await ejsRender(path.resolve(__dirname, `../template/${framework}`), fileNamePath, options);
}
