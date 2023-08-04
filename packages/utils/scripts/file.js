import fs from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const deleteFolderRecursive = async (path = '') => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(async (file) => {
      const curPath = resolve(path, file);

      if (fs.statSync(curPath).isDirectory()) {
        if (file !== 'node_modules') {
          await deleteFolderRecursive(curPath);
        }
        return;
      }

      fs.unlinkSync(curPath);
    });

    fs.rmdirSync(path);
  }
};
