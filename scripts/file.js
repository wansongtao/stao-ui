import fs from 'fs';
import { resolve } from 'path';

/**
 * 删除文件夹及其子文件
 * @param {string} path 
 */
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

/**
 * 向文件里插入内容
 * @param {string} path
 * @param {string} content
 * @param {(data: string) => string} updateFn
 */
export const insertContent = (path, content, updateFn) => {
  // 读取文件
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    // 添加新内容
    let newData = data;
    if (content) {
      newData = content + data;
    }
    if (updateFn) {
      newData = updateFn(newData) || '';
    }

    // 将新内容写入文件
    fs.writeFile(path, newData, 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
};
