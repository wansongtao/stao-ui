# number2chinesenumber
将阿拉伯数字转换为中文数字的TS库。支持中文大小写数字，支持中文金额数字模式，最多支持16位整数的转换。代码测试覆盖率达到100%。

## 安装
```bash
npm install number2chinesenumber

# or

pnpm add number2chinesenumber
```

## 基础用法
```typescript
import convertToChineseNumber from 'number2chinesenumber';

convertToChineseNumber(1234567890); // 一十二亿三千四百五十六万七千八百九十
convertToChineseNumber(1234567890, 'max'); // 壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾
```

## 进阶用法
```typescript
import convertToChineseNumber from 'number2chinesenumber';

const num = 100.7007
convertToChineseNumber(num, 'maxAmount') // 壹佰元零柒角整
convertToChineseNumber(num, 'amount') // 一百元零七角
```

## 更多
npm 地址：[https://www.npmjs.com/package/number2chinesenumber](https://www.npmjs.com/package/number2chinesenumber).
