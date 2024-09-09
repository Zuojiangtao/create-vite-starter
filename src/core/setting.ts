import path from 'node:path';
import fs from 'node:fs';
import prompts from 'prompts';
import { DEFAULT_PROJECT_NAME, FRAMEWORKS, PLUGIN_DEPENDENCE } from '@/config/compile.config';
import { getLanguage } from '@/utils/getLanguage';

const isFeatureFlagsUsed = false;

export default async function setOption(lang: prompts.Answers<any>): Promise<Options> {
  const language = getLanguage(lang.language);

  const result = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: language.projectName.message,
      initial: DEFAULT_PROJECT_NAME,
    },
    {
      type: prev => {
        try {
          const stats = fs.statSync(path.resolve(process.cwd(), prev));
          if (stats.isDirectory()) {
            return 'confirm';
          } else {
            return null;
          }
        } catch (e) {
          if (e.code === 'ENOENT') {
            return null;
          } else {
            // 处理其他错误
            console.error(`发生其它错误: ${e.message}`);
          }
        }
      },
      name: 'overwrite',
      message: prev => `${language.shouldOverwrite.dirForPrompts.target} "${prev}" ${language.shouldOverwrite.message}`,
      initial: false,
    },
    {
      type: 'select',
      name: 'framework',
      message: language.framework.message,
      choices: FRAMEWORKS.map(framework => {
        return {
          title: framework.display,
          value: framework.display,
        };
      }),
    },
    // {
    //   name: 'useTypeScript',
    //   type: () => (isFeatureFlagsUsed ? null : 'toggle'),
    //   message: 'language.useTypeScript.message',
    //   initial: false,
    //   active: 'on',
    //   inactive: 'off',
    // },
    {
      name: 'useJsx',
      type: () => (isFeatureFlagsUsed ? null : 'toggle'),
      message: language.useJsx.message,
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      name: 'useRouter',
      type: () => (isFeatureFlagsUsed ? null : 'toggle'),
      message: language.useRouter.message,
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      name: 'usePinia',
      type: () => (isFeatureFlagsUsed ? null : 'toggle'),
      message: language.usePinia.message,
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      name: 'useEslint',
      type: () => (isFeatureFlagsUsed ? null : 'toggle'),
      message: language.useEslint.message,
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      name: 'usePrettier',
      type: (prev, values) => {
        if (isFeatureFlagsUsed || !values.useEslint) {
          return null;
        }
        return 'toggle';
      },
      message: language.usePrettier.message,
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      name: 'useHusky',
      type: () => (isFeatureFlagsUsed ? null : 'toggle'),
      message: language.useHusky.message,
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      name: 'plugins',
      type: 'multiselect',
      message: language.customPlugins.message,
      choices: PLUGIN_DEPENDENCE.map(item => {
        return {
          title: item.label,
          value: item.value,
        };
      }),
      instructions: false,
    },
  ]);

  // format options plugins
  if (result.plugins.length) result.plugins.forEach(plugin => (result[plugin] = true));
  delete result.plugins;

  return result;
}
