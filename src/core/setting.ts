import path from 'node:path';
import fs from 'node:fs';
import prompts from 'prompts';
import { DEFAULT_PROJECT_NAME, FRAMEWORKS, PACKAGE_MANAGER, PLUGIN_DEPENDENCE } from '@/config/compile.config';
import { getLanguage } from '@/utils/getLanguage';

const isFeatureFlagsUsed = false;

/**
 * 设置项目配置选项
 * @param lang - 语言配置对象
 * @returns 返回项目配置选项
 */
export default async function setOption(lang: { language: string }): Promise<Options> {
  // 获取对应语言的文案
  const language = getLanguage(lang.language);

  // 通过prompts获取用户输入的配置
  const result = await prompts([
    {
      // 项目名称配置
      type: 'text',
      name: 'projectName',
      message: language.projectName.message,
      initial: DEFAULT_PROJECT_NAME,
    },
    {
      // 是否覆盖已存在目录配置
      type: prev => {
        try {
          const stats = fs.statSync(path.resolve(process.cwd(), prev));
          if (stats.isDirectory()) {
            return 'confirm';
          } else {
            return null;
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            if ('code' in err && err.code === 'ENOENT') {
              return null;
            } else {
              // 处理其他错误
              console.error(`发生其它错误: ${err.message}`);
              return null;
            }
          }
          return null;
        }
      },
      name: 'overwrite',
      message: prev => `${language.shouldOverwrite.dirForPrompts.target} "${prev}" ${language.shouldOverwrite.message}`,
      initial: false,
    },
    {
      // 包管理器选择配置
      type: 'select',
      name: 'packageManager',
      message: language.packageManager.message,
      choices: (PACKAGE_MANAGER as Array<{ label: string; value: string }>).map(pkgManager => {
        return {
          title: pkgManager.label,
          value: pkgManager.value,
        };
      }),
      initial: 0,
    },
    {
      // 框架选择配置
      type: 'select',
      name: 'framework',
      message: language.framework.message,
      choices: (FRAMEWORKS as Array<{ name: string; display: string }>).map(framework => {
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
      // JSX支持配置
      name: 'useJsx',
      type: (_prev, values) => {
        if (isFeatureFlagsUsed || values.framework === 'React') {
          return null;
        }
        return 'toggle';
      },
      message: language.useJsx.message,
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      // 路由配置
      name: 'useRouter',
      type: (_prev, values) => {
        if (isFeatureFlagsUsed || values.framework === 'React') {
          return null;
        }
        return 'toggle';
      },
      message: language.useRouter.message,
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      // Pinia状态管理配置
      name: 'usePinia',
      type: (_prev, values) => {
        if (isFeatureFlagsUsed || values.framework === 'React') {
          return null;
        }
        return 'toggle';
      },
      message: language.usePinia.message,
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      // ESLint配置
      name: 'useEslint',
      type: () => (isFeatureFlagsUsed ? null : 'toggle'),
      message: language.useEslint.message,
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      // Prettier配置
      name: 'usePrettier',
      type: (_prev, values) => {
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
      // Husky配置
      name: 'useHusky',
      type: () => (isFeatureFlagsUsed ? null : 'toggle'),
      message: language.useHusky.message,
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      // 自定义插件配置
      name: 'plugins',
      type: 'multiselect',
      message: language.customPlugins.message,
      choices: (PLUGIN_DEPENDENCE as Array<{ label: string; value: string }>).map(item => {
        return {
          title: item.label,
          value: item.value,
        };
      }),
      instructions: false,
    },
  ]);

  // 格式化插件配置选项
  if (result.plugins?.length) {
    result.plugins.forEach((plugin: string) => {
      (result as any)[plugin] = true;
    });
  }
  delete result.plugins;

  return result;
}
