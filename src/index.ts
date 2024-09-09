#!/usr/bin/env node

import start from './core/start';
import setting from './core/setting';
import create from './core/create';

async function initViteStarterCommand() {
  // start
  const lang = await start();

  // setting
  const options = await setting(lang);

  // create
  await create(options);
}

initViteStarterCommand().then(() => {
  console.log('初始化项目成功，请自行启动.');
});
