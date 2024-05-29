# number2chinesenumber

## 简介

`number2chinesenumber` 是一个将数字转换为中文数字的工具库，支持将数字转换为中文大小写数字、中文金额等。

## 安装

```bash
npm install number2chinesenumber

# or

pnpm add number2chinesenumber
```

## 使用

```js
import number2chinesenumber from 'number2chinesenumber';

number2chinesenumber(1234567890); // 一十二亿三千四百五十六万七千八百九十
number2chinesenumber(1234567890, 'max'); // 壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾

const num = 100.7007
number2chinesenumber(num, 'maxAmount') // 壹佰元零柒角整
number2chinesenumber(num, 'amount') // 一百元零七角
```

## 更多

npm 地址：[number2chinesenumber](https://www.npmjs.com/package/number2chinesenumber).
