import {
  __dirname,
  deleteFolderRecursive
} from './file.js';
import cmd from './cmd.js';
import { resolve } from 'path';

const componentPath = resolve(__dirname, '../');

const removeDist = async () => {
  await deleteFolderRecursive(`${componentPath}/dist`);
};

const buildComponent = async () => {
  await cmd('pnpm run build', componentPath);
};

const buildPackage = async () => {
  await removeDist();
  await buildComponent();
};

buildPackage();
