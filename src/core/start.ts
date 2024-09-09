import prompts from 'prompts';
import { LANGUAGE } from '@/config/compile.config';

export default async function start(): Promise<prompts.Answers<any>> {
  console.log();
  console.log('A vite-based front-end startup template generator.');
  console.log();
  return await prompts([
    {
      type: 'select',
      name: 'language',
      message: 'Select a language:',
      choices: LANGUAGE.map(framework => {
        return {
          title: framework.label,
          value: framework.value,
        };
      }),
    },
  ]);
}
