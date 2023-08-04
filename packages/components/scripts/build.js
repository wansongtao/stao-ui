import { deleteFolderRecursive, insertContent } from '../../../scripts/file.js';
import cmd from '../../../scripts/cmd.js';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const componentPath = resolve(__dirname, '../');

const removeDist = async () => {
  await deleteFolderRecursive(`${componentPath}/dist`);
};

const buildComponent = async () => {
  await cmd('pnpm run build', componentPath);
};

const buildStyle = () => {
  // 解决vite打包单文件组件且使用style标签的css时，css不会引入组件的问题
  // 为什么用vite打包：因为这只是一个个人工作积累的代码库，主要包含二次封装
  //组件和一些工具函数，且主要使用方式是直接复制源码，而且本人也比较喜欢在style里写css。

  // 在js文件里插入css引入
  insertContent(`${componentPath}/dist/index.js`, `import "./style.css";\n`);

  insertContent(`${componentPath}/dist/index.umd.js`, undefined, (data) => {
    const signalText = `"use strict";`;
    let idx = data.indexOf(signalText);
    if (idx === -1) {
      return data;
    }
    idx = idx + signalText.length;

    const text =
      "var link = document.createElement('link');link.type = 'text/css';link.rel = 'stylesheet';link.href = './style.css';document.getElementsByTagName('head')[0].appendChild(link);link=null;";
    const newData = data.slice(0, idx) + text + data.slice(idx);

    return newData;
  });
};

const buildPackage = async () => {
  await removeDist();
  await buildComponent();
  buildStyle();
};

buildPackage();
