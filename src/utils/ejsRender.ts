import path from 'node:path';
import fs from 'node:fs';
import ejs from 'ejs';
import prettier from 'prettier';

/**
 * transform ejs file to outfile
 *
 * @param {string} src - source file path
 * @param {string} dest - destination filename of the ejs render operation
 * @param {Options} options - render options
 * @returns {Promise}
 * */
export async function ejsRender(src: string, dest: string, options: Options): Promise<void> {
  const fileName = path.basename(src);
  const extName = path.extname(src).replace(/[.]/g, '');

  if (fs.statSync(src).isDirectory()) {
    if (fileName === 'node_modules') return;
    // !fs.statSync(dest).isDirectory() && fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      await ejsRender(path.resolve(src, file), path.resolve(dest, file), options);
    }
    return;
  }

  // ================= skip not ejs file =================
  if (extName !== 'ejs') return;

  try {
    let prettierCode = null;
    // 需要转换的ejs文件
    const ejsFilePath = path.resolve(src);
    // 转换后的文件
    const outputFilePath = path.resolve(dest.split('.ejs')[0]);
    // buffer code
    const templateBufferCode = await fs.readFileSync(ejsFilePath);
    // ejs render code
    const code = ejs.render(templateBufferCode.toString(), { options });
    // 获取后缀
    const _extname = path.extname(dest.split('.ejs')[0]).replace(/[.]/g, '');
    // outputPath
    const opts = await prettier.resolveConfig(src);

    try {
      switch (_extname) {
        case 'ts':
          prettierCode = await prettier.format(code, {
            parser: 'typescript',
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
          prettierCode = await prettier.format(code, { parser: _extname });
          break;
      }
    } catch (err) {
      console.log(err);
    }

    // 文件写入
    fs.writeFileSync(outputFilePath, prettierCode);
    // fs.unlinkSync(ejsFilePath);
  } catch (e) {
    console.error(e);
  }
}
