import prompts from 'prompts';
import chalk from 'chalk';

/**
 * 启动CLI并获取用户语言选择
 * @returns 返回用户选择的语言配置
 */
export default async function start(): Promise<{ language: string }> {
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

  const result = await prompts({
    type: 'select',
    name: 'language',
    message: '请选择语言 / Please select a language:',
    choices: [
      { title: '简体中文', value: 'zh-cn' },
      { title: 'English', value: 'en' },
    ],
    initial: 0,
  });

  return { language: result.language };
}
