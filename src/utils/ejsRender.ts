import path from 'node:path';
import fs from 'node:fs';
import ejs from 'ejs';
import prettier from 'prettier';

/**
 * transform ejs file to outfile
 *
 * @param {string} src - source file path
 * @param {string} dest - destination filename of the ejs render operation
 * @returns {Promise}
 * */
export async function ejsRender(src: string, dest: string): Promise<void> {
  const fileName = path.basename(src);

  if (fs.statSync(src).isDirectory()) {
    if (fileName === 'node_modules') return;
    !fs.statSync(dest).isDirectory() && fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      await ejsRender(path.resolve(src, file), path.resolve(dest, file));
    }
    return;
  }

  // ================= skip not ejs file =================
  const extName = path.extname(dest).replace(/[.]/g, '');
  if (!extName.endsWith('.ejs')) return;

  try {
    let prettierCode = null;
    // 获取当前渲染文件的 各种 参数
    const file = path.parse(src);
    console.log(file);
    // 需要转换的ejs文件
    const ejsFilePath = path.resolve(dest, file.dir, `${file.name}.ejs`);
    // 转换后的文件
    const outputFilePath = path.resolve(dest, src);
    // buffer code
    const templateBufferCode = await fs.readFileSync(outputFilePath);
    // ejs render code
    const code = ejs.render(templateBufferCode.toString());
    // 获取后缀
    const extName = path.extname(src).replace(/[.]/g, '');
    // outputPath
    const opts = await prettier.resolveConfig(src);
    // // prettierCode
    // const prettierFormatOptions = {
    //   parser: 'babel',
    //   ...outputPath,
    // } || { parser: extName }
    // const prettierCode = await prettier.format(code, prettierFormatOptions)

    try {
      switch (extName) {
        case 'ts':
          prettierCode = await prettier.format(code, {
            parser: 'babel',
            ...opts,
          });
          break;
        case 'tsx':
          prettierCode = await prettier.format(code, {
            parser: 'babel',
            ...opts,
          });
          break;
        case 'jsx':
          prettierCode = await prettier.format(code, {
            parser: 'babel',
            ...opts,
          });
          break;
        case 'js':
          prettierCode = await prettier.format(code, {
            parser: 'babel',
            ...opts,
          });
          break;
        case '':
          prettierCode = code;
          break;
        default:
          prettierCode = await prettier.format(code, { parser: extName });
          break;
      }
    } catch (err) {
      console.log(err);
    }

    // 文件写入
    fs.writeFileSync(outputFilePath, prettierCode);
    fs.unlinkSync(ejsFilePath);
  } catch (e) {
    console.error(e);
  }
}
