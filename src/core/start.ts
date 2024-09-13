import prompts from 'prompts';
import { LANGUAGE } from '@/config/compile.config';
import chalk from 'chalk';

export default async function start(): Promise<prompts.Answers<any>> {
  console.log();
  console.log('A vite-based front-end startup template generator.');
  console.log();
  console.log(
    chalk.red('Note: This cli is built based on vite, and the node version requires 14.18+ or 16+ or higher'),
  );
  console.log();
  return await prompts([
    {
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
