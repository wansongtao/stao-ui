import { deleteFolderRecursive } from '../../../scripts/file.js';
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

const buildPackage = async () => {
  await removeDist();
  await buildComponent();
};

buildPackage();
