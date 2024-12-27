import chalk from 'chalk';
import { getLanguage } from '@/utils/getLanguage';

interface Options {
  projectName: string;
  packageManager: string;
}

interface Language {
  language: string;
  infos: {
    done: string;
  };
}

/**
 * 显示项目生成完成后的提示信息
 * @param lang - 语言配置对象
 * @param option - 项目配置选项
 */
export default async function showGenerationInfo(lang: Language, option: Options) {
  // 解构获取项目名称和包管理器
  const { projectName, packageManager } = option;
  // 获取对应语言的文案
  const language = getLanguage(lang.language);

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
