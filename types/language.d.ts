export interface Language {
  infos: {
    scaffolding: string;
    installing: string;
    complete: string;
  };
  projectName: {
    message: string;
  };
  shouldOverwrite: {
    message: string;
    dirForPrompts: {
      target: string;
    };
  };
  packageManager: {
    message: string;
  };
  framework: {
    message: string;
  };
  useJsx: {
    message: string;
  };
  useRouter: {
    message: string;
  };
  usePinia: {
    message: string;
  };
  useEslint: {
    message: string;
  };
  usePrettier: {
    message: string;
  };
  useHusky: {
    message: string;
  };
  customPlugins: {
    message: string;
  };
} 