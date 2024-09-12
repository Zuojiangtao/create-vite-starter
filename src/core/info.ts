import chalk from 'chalk';
import { getLanguage } from '@/utils/getLanguage';

export default async function showGenerationInfo(lang: object, option: Options) {
  const { projectName, packageManager } = option;
  const language = getLanguage(lang.language);

  console.log(`\n${chalk.cyan(language.infos.done)}\n`);

  console.log(chalk.green(`  cd ${projectName}`));
  console.log(chalk.green(`  ${packageManager} install`));
  if (packageManager === 'npm') {
    console.log(chalk.green(`  ${packageManager} run dev`));
  } else {
    console.log(chalk.green(`  ${packageManager} dev`));
  }
  console.log();
}
