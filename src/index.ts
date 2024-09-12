#!/usr/bin/env node

import start from './core/start';
import setting from './core/setting';
import create from './core/create';
import info from './core/info';

(async function initViteStarterCommand() {
  // start
  const lang = await start();

  // setting
  const options = await setting(lang);

  // create
  await create(lang, options);

  // install
  await info(lang, options);
})();
