import path from 'node:path';
import fs from 'node:fs';

/**
 * lang
 *
 * @param {string} lang - select language
 * @return {__filename}
 * */
export function getLanguage(lang: string): any {
  const localesRoot = path.resolve(__dirname, '../locales');
  const languageFilePath = path.resolve(localesRoot, `${lang}.json`);
  const doesLanguageExist = fs.existsSync(languageFilePath);

  /* eslint-disable */
  return doesLanguageExist ? require(languageFilePath) : require(path.resolve(localesRoot, 'en.json'));
  /* eslint-enable */
}
