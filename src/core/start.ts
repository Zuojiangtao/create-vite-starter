import prompts from 'prompts';
import { LANGUAGE } from '@/config/compile.config';
import chalk from 'chalk';

/**
 * 启动CLI并获取用户语言选择
 * @returns 返回用户选择的语言配置
 */
export default async function start(): Promise<prompts.Answers<any>> {
  // 打印空行
  console.log();
  // 打印CLI工具说明
  console.log('A vite-based front-end startup template generator.');
  console.log();
  // 打印Node.js版本要求提示
  console.log(
    chalk.red('Note: This cli is built based on vite, and the node version requires 14.18+ or 16+ or higher'),
  );
  console.log();

  // 返回用户语言选择结果
  return await prompts([
    {
      // 语言选择配置
      type: 'select',
      name: 'language',
      message: 'Select your language:',
      choices: LANGUAGE.map(framework => {
        return {
          title: framework.label,
          value: framework.value,
        };
      }),
    },
  ]);
}
