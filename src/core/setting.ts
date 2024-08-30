import { parseArgs } from 'node:util';
import prompts from 'prompts';
import { FRAMEWORKS, PLUGIN_DEPENDENCE } from '@/config/compile.config';

// const result: Options = {
//   plugins: [],
//   cssPre: '',
// }

const args = process.argv.slice(2);

// alias is not supported by parseArgs
const options = {
  typescript: { type: 'boolean' },
  ts: { type: 'boolean' },
  'with-tests': { type: 'boolean' },
  tests: { type: 'boolean' },
  'vue-router': { type: 'boolean' },
  router: { type: 'boolean' },
  'vue-devtools': { type: 'boolean' },
  devtools: { type: 'boolean' },
} as const;

const { values: argv, positionals } = parseArgs({
  args,
  options,
  strict: false,
});

let targetDir = positionals[0];

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName);
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-');
}

// if any of the feature flags is set, we would skip the feature prompts
const isFeatureFlagsUsed =
  typeof (
    argv.default ??
    (argv.ts || argv.typescript) ??
    argv.jsx ??
    (argv.router || argv['vue-router']) ??
    argv.pinia ??
    (argv.tests || argv['with-tests']) ??
    argv.vitest ??
    argv.cypress ??
    argv.nightwatch ??
    argv.playwright ??
    argv.eslint ??
    argv['eslint-with-prettier'] ??
    (argv.devtools || argv['vue-devtools'])
  ) === 'boolean';

export default async function setOption() {
  const result = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'project name',
      initial: 'vite-starter',
      onState: state => {
        // console.log(state)
        targetDir = state.value;
      },
    },
    {
      type: 'confirm',
      name: 'overwrite',
      message: `Target directory "${targetDir}" is not empty. Remove existing files and continue?`,
      initial: true,
    },
    {
      type: 'select',
      name: 'framework',
      message: 'Select a framework:',
      choices: FRAMEWORKS.map(framework => {
        return {
          title: framework.display,
          value: framework.display,
        };
      }),
    },
    {
      name: 'packageName',
      type: () => (isValidPackageName(targetDir) ? null : 'text'),
      message: 'packageName?',
      initial: () => toValidPackageName(targetDir),
      validate: dir => isValidPackageName(dir) || 'packageName?',
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
      message: 'language.useJsx.message',
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      name: 'useRouter',
      type: () => (isFeatureFlagsUsed ? null : 'toggle'),
      message: 'language.useRouter.message',
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      name: 'usePinia',
      type: () => (isFeatureFlagsUsed ? null : 'toggle'),
      message: 'language.usePinia.message',
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      name: 'useEslint',
      type: () => (isFeatureFlagsUsed ? null : 'toggle'),
      message: 'language.useEslint.message',
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
      message: 'language.usePrettier.message',
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      name: 'useHusky',
      type: () => (isFeatureFlagsUsed ? null : 'toggle'),
      message: 'language.useHusky.message',
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      name: 'useVitest',
      type: () => (isFeatureFlagsUsed ? null : 'toggle'),
      message: 'language.useVitest.message',
      initial: false,
      active: 'on',
      inactive: 'off',
    },
    {
      name: 'plugins',
      type: 'multiselect',
      message: 'Custom plugins',
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
  result.plugins.length && result.plugins.forEach(plugin => (result[plugin] = true));
  delete result.plugins;

  return result;
}
