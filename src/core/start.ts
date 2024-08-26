import prompts from 'prompts';

const LANGUAGE = [
  {
    label: 'EN',
    value: 'en',
  },
  {
    label: '中文',
    value: 'zh-cn',
  },
];

export default async function start() {
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
