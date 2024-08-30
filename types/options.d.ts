interface Options {
  // base
  projectName?: string
  overwrite?: boolean
  framework?: string
  useTypeScript?: boolean
  useJsx?: boolean
  useRouter?: boolean
  usePinia?: boolean
  useEslint?: boolean
  usePrettier?: boolean
  useHusky?: boolean
  useVitest?: boolean
  // plugins
  usePluginVueUseCore?: boolean
  usePluginVisualizer?: boolean
  usePluginAutoImport?: boolean
  usePluginVueComponents?: boolean
  usePluginCompression?: boolean
  usePluginExternalCDN?: boolean
  usePluginHtml?: boolean
  usePluginImageOptimizer?: boolean
  usePluginSvgLoader?: boolean
}
