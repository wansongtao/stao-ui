# web-storage-plus

## 简介

增强浏览器的localStorage和sessionStorage API，支持设置过期时间、命名空间、异步/同步、自定义json化与解析函数、加解密函数。  
提供stringify/parse函数，相比JSON.stringify/JSON.parse方法，额外支持了function、regexp、date、undefined、NaN、Infinity、-Infinity、bigint。  
提供encode/decode函数，用于将字符串转换为base64编码或将base64编码转换为字符串，安全性要求不高时可用来加密，安全性要求较高时，推荐使用您自己编写的加解密函数。  

## 安装

```bash
npm install web-storage-plus

# or

pnpm add web-storage-plus
```

## 使用

```typescript
import { setStorage, getStorage, setStorageAsync, getStorageAsync } from 'web-storage-plus'

const data = { name: 'test', data: 'this is a test.' }

setStorage('storage', data)
getStorage<{ name: string; data: string; }>('storage') // { name: 'test', data: 'this is a test.' }

setStorageAsync('test', data).then(() => {
  console.log('setStorage success.');
});
getStorageAsync('test').then((data) => {
  console.log('getStorage success.', data);
});
```

## 更多

[web-storage-plus 中文文档](https://github.com/wansongtao/web-storage-plus/blob/main/README.zh-CN.md).  
npm 地址：[web-storage-plus](https://www.npmjs.com/package/web-storage-plus).
