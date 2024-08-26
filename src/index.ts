#!/usr/bin/env node

import start from './core/start';
import setting from './core/setting';

async function initViteStarterCommand() {
  // start
  const lang = await start();
  console.log(lang);

  // setting
  const options = await setting();
  console.log(options);
}

initViteStarterCommand().then(() => {
  console.log('初始化项目成功，请自行启动.');
});
