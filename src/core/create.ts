import path from 'node:path';
import fs from 'node:fs';
import { copyTemplate } from '@/utils/copyTemplate';
import { ejsRender } from '@/utils/ejsRender';

export default async function create(options: Options) {
  console.log(options);
  const {
    projectName,
    overwrite: shouldOverwrite,
    useTypeScript: needsTypeScript,
    useJsx: needsJsx,
    useRouter: needsRouter,
    usePinia: needsPinia,
    useEslint: needsEslint,
    usePrettier: needsPrettier,
    useVitest: needsVitest,
  } = options;

  const name = projectName ?? 'vite-app';
  const root = path.resolve(process.cwd(), name);

  // ================= overwrite =================
  if (fs.existsSync(root) && shouldOverwrite) {
    fs.writeFileSync(root, '');
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  // ================= copy template =================
  // base
  await copyTemplate(path.resolve(__dirname, '../template/base'), root);
  // framework
  // todo: 完整框架模板逻辑
  // vue2
  await copyTemplate(path.resolve(__dirname, '../template/vue2'), root);

  // ================= ejs render =================
  // base
  // framework
  // vue2
  await ejsRender(path.resolve(__dirname, '../template/vue2'), root);
}
