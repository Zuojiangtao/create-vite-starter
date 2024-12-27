import chalk from 'chalk';
import { getLanguage } from '@/utils/getLanguage';

interface Options {
  projectName?: string;
  packageManager?: string;
}

/**
 * 打印项目创建完成信息
 * @param lang - 语言标识
 * @param options - 项目配置选项
 */
export default async function info(lang: { language: string }, options: Options): Promise<void> {
  const language = getLanguage(lang.language);
  // 解构获取项目名称和包管理器
  const { projectName = '', packageManager = 'npm' } = options;

  // 打印完成提示
  console.log(`\n${chalk.cyan(language.infos.done)}\n`);

  // 打印后续操作步骤
  console.log(chalk.green(`  cd ${projectName}`));
  console.log(chalk.green(`  ${packageManager} install`));
  // npm需要额外加run命令
  if (packageManager === 'npm') {
    console.log(chalk.green(`  ${packageManager} run dev`));
  } else {
    console.log(chalk.green(`  ${packageManager} dev`));
  }
  console.log();
}
