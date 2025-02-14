/**
 * Compile parameter enum constants / 编译参数枚举常量
 * */

// lang
export const LANGUAGE = [
  {
    label: 'EN',
    value: 'en',
  },
  {
    label: '中文',
    value: 'zh-cn',
  },
];

// default projectName
export const DEFAULT_PROJECT_NAME = 'vite-starter';

// packageManager
export const PACKAGE_MANAGER: object[] = [
  {
    label: 'npm',
    value: 'npm',
  },
  {
    label: 'yarn',
    value: 'yarn',
  },
  {
    label: 'pnpm',
    value: 'pnpm',
  },
];

// framework
export const FRAMEWORKS: object[] = [
  {
    name: 'vue',
    display: 'Vue',
  },
  {
    name: 'react',
    display: 'React',
  },
  // {
  //   name: 'nuxt',
  //   display: 'Nuxt',
  // },
  // {
  //   name: 'next',
  //   display: 'Next',
  // },
];

// plugin
export const PLUGIN_DEPENDENCE: object[] = [
  {
    label: '@vueuse/core',
    value: 'usePluginVueUseCore',
    featureLimited: ['Vue'],
  },
  {
    label: 'rollup-plugin-visualizer',
    value: 'usePluginVisualizer',
    featureLimited: ['Vue', 'React'],
  },
  {
    label: 'unplugin-auto-import',
    value: 'usePluginAutoImport',
    featureLimited: ['Vue', 'React'],
  },
  {
    label: 'unplugin-vue-components',
    value: 'usePluginVueComponents',
    featureLimited: ['Vue'],
  },
  {
    label: 'vite-plugin-compression',
    value: 'usePluginCompression',
    featureLimited: ['Vue', 'React'],
  },
  {
    label: 'vite-plugin-external-cdn',
    value: 'usePluginExternalCDN',
    featureLimited: ['Vue', 'React'],
  },
  {
    label: 'vite-plugin-html',
    value: 'usePluginHtml',
    featureLimited: ['Vue', 'React'],
  },
  {
    label: 'vite-plugin-image-optimizer',
    value: 'usePluginImageOptimizer',
    featureLimited: ['Vue', 'React'],
  },
  {
    label: 'vite-svg-loader',
    value: 'usePluginSvgLoader',
    featureLimited: ['Vue', 'React'],
  },
];
