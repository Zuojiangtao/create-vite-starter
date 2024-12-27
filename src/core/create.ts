import path from 'node:path';
import fs from 'node:fs';
import chalk from 'chalk';
import { copyTemplate } from '@/utils/copyTemplate';
import { ejsRender } from '@/utils/ejsRender';
import { DEFAULT_PROJECT_NAME } from '@/config/compile.config';
import { getLanguage } from '@/utils/getLanguage';

/**
 * 递归删除文件夹及其内容
 * @param filePath - 要删除的文件夹路径
 */
function recursiveDeleteFolder(filePath: string) {
  try {
    // 遍历文件夹中的所有文件和子文件夹
    for (const fileName of fs.readdirSync(filePath)) {
      // 获取完整路径
      const fullPath = path.resolve(filePath, fileName);
      // 如果是文件夹则递归删除
      if (fs.lstatSync(fullPath).isDirectory()) {
        recursiveDeleteFolder(fullPath);
        fs.rmdirSync(fullPath);
        continue;
      }
      // 删除文件
      fs.unlinkSync(fullPath);
    }
    // 删除空文件夹
    fs.rmdirSync(filePath);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // 打印错误信息
      console.error(`删除文件夹时发生错误: ${error.message}`);
      throw error;
    }
    throw new Error('未知错误');
  }
}

/**
 * 创建项目
 * @param lang - 语言配置对象，包含language字段
 * @param options - 项目配置选项
 * @returns Promise<void>
 */
export default async function create(lang: { language: string }, options: Options) {
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
