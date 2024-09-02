/**
 * Compile parameter enum constants / 编译参数枚举常量
 * */

// default projectName
export const DEFAULT_PROJECT_NAME = 'vite-starter';

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
  {
    name: 'preact',
    display: 'Preact',
  },
];

// plugin
export const PLUGIN_DEPENDENCE: object[] = [
  {
    label: '@vueuse/core',
    value: 'usePluginVueUseCore',
    version: '^10.9.0',
  },
  {
    label: 'rollup-plugin-visualizer',
    value: 'usePluginVisualizer',
    version: '^5.12.0',
  },
  {
    label: 'unplugin-auto-import',
    value: 'usePluginAutoImport',
    version: '^0.17.5',
  },
  {
    label: 'unplugin-vue-components',
    value: 'usePluginVueComponents',
    version: '^0.26.0',
  },
  {
    label: 'vite-plugin-compression',
    value: 'usePluginCompression',
    version: '^0.5.1',
  },
  {
    label: 'vite-plugin-external-cdn',
    value: 'usePluginExternalCDN',
    version: '^1.0.1',
  },
  {
    label: 'vite-plugin-html',
    value: 'usePluginHtml',
    version: '^3.2.2',
  },
  {
    label: 'vite-plugin-image-optimizer',
    value: 'usePluginImageOptimizer',
    version: '^1.1.8',
  },
  {
    label: 'vite-svg-loader',
    value: 'usePluginSvgLoader',
    version: '^5.1.0',
  },
];
