# web-storage-plus

增强版的 webStorage，支持设置过期时间、同步/异步、命名空间、字符串化与解析函数、加解密函数等功能。  
提供 stringify/parse 函数，相比 JSON.stringify/JSON.parse 方法，额外支持了 function、regexp、date、undefined、NaN、Infinity、-Infinity、bigint。  
提供 encode/decode 函数，用于将字符串转换为 base64 编码或将 base64 编码转换为字符串，安全性要求不高时可用来加密，安全性要求较高时，推荐使用您自己编写的加解密函数。  
以上函数都是可选的，如果您不需要，可以不用引入。

## 安装

```bash
npm install web-storage-plus

# or

pnpm add web-storage-plus
```

## 基础用法

```typescript
import { setStorage, getStorage, removeStorage } from 'web-storage-plus';

setStorage('key', 'value');
getStorage('key'); // value

// 设置过期时间-24小时
setStorage('key', 'value', { maxAge: 60 * 60 * 24 });
// 如果已过期，则删除该数据
getStorage('key', { isDeleteExpired: true }); // value

// 异步存储
setStorage('key', { a: 1, b: 2 }, { isAsync: true });
getStorage('key'); // { a: 1, b: 2 }

// 异步读取
const res = getStorage('key', { isAsync: true }) as Promise<{
  a: number;
  b: number;
}>;
res.then((data) => {
  console.log(data); // { a: 1, b: 2 }
  removeStorage('key', { isAsync: true });
});
```

## 进阶用法

```typescript
import { setStorage, getStorage, stringify, parse, encode, decode } from 'web-storage-plus';

const data = { a: 1, b: undefined, c: null, d: NaN, e: Infinity, f: -Infinity, g: 1n, h: new Date(), i: /abc/, j: () => {} };

setStorage('key', data, {
  prefix: 't-',
  isLocalStorage: false,
  isAsync: true,
  stringifyFn: stringify,
  encodeFn: encode
});

getStorage('key', {
  prefix: 't-',
  isLocalStorage: false,
  parseFn: parse,
  decodeFn: decode
}); // { a: 1, b: undefined, c: null, d: NaN, e: Infinity, f: -Infinity, g: 1n, h: Date, i: /abc/, j: () => {} }
```

## 更多
更多用法与API请参考 [web-storage-plus 文档](https://github.com/wansongtao/web-storage-plus/blob/main/README.zh-CN.md).  
npm 地址：[https://www.npmjs.com/package/web-storage-plus](https://www.npmjs.com/package/web-storage-plus).
