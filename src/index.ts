#!/usr/bin/env node

import start from './core/start';

async function initViteStarterCommand() {
  // start
  const lang = await start();
  console.log(lang);
}

initViteStarterCommand().then(() => {
  console.log('初始化项目成功，请自行启动.');
});
