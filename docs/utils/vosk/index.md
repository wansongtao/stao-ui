# vosk 语音识别

## 介绍

`vosk` 是一个开源的语音识别工具，支持离线识别，支持多种语言，支持多种平台，支持多种语言模型，支持多种语言的语音数据训练。  
`vosk` 语音识别工具的官方网站：[https://alphacephei.com/vosk/](https://alphacephei.com/vosk/)  
本文我们将介绍如何在 `Windows` 平台上使用 `nodejs` 搭建一个 `vosk` 语音识别工具，并使用 `vosk` 语音识别工具进行语音识别。

## 开始

1. 下载微软的Visual Studio 并选择安装c++桌面开发模块;
2. 需要 python3.8 以上环境
3. 卸载 Windows-build-tools
4. 全局安装 node-gyp
5. node版本不能太低，需要支持esm
6. 去官网下载语言模型 [下载地址](https://alphacephei.com/vosk/models)

## 安装

```bash
npm install vosk
```

## vosk 封装

封装 vosk 语音识别工具函数，代码如下：
```js
import { existsSync } from 'node:fs';
import vosk from 'vosk';
import { Readable } from 'node:stream';
import wav from 'wav';

// 语言模型路径
const MODEL_PATH = './model/vosk-model-small-cn';

if (!existsSync(MODEL_PATH)) {
  console.log('模型不存在，请确认路径是否正确');
  process.exit();
}

/**
 * 语音识别
 * @param {stream} audioStream
 */
const speechRecognition = async (audioStream) => {
  return new Promise((resolve, reject) => {
    const wfReader = new wav.Reader();
    const wfReadable = new Readable().wrap(wfReader);

    wfReader.on('format', async ({ audioFormat, sampleRate, channels }) => {
      if (audioFormat !== 1 || channels !== 1) {
        reject('只支持单声道wav格式的音频文件');
        return;
      }

      try {
        const model = new vosk.Model(MODEL_PATH);
        const rec = new vosk.Recognizer({
          model: model,
          sampleRate: sampleRate
        });
        for await (const data of wfReadable) {
          rec.acceptWaveform(data);
        }

        const result = rec.result();
        rec.free();
        resolve(result.text);
      } catch (ex) {
        reject('语音识别失败');
      }
    });

    wfReadable.on('error', (err) => {
      reject('文件读取失败');
    });

    audioStream.pipe(wfReader);
  });
};

export default speechRecognition;
```

## 搭建http服务

### 安装依赖

```bash
npm install koa koa-bodyparser koa-router busboy
```

### 创建服务

```js
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();
app.use(bodyParser());

router.post('/transcribe', async (ctx) => {
  ctx.body = { code: 200, msg: '', data: '语音识别成功' };
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
```

## 语音识别接口

```js
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import busboy from 'busboy';
import speechRecognition from './vosk.js';

const app = new Koa();
const router = new Router();
app.use(bodyParser());

router.post('/transcribe', async (ctx) => {
  /**
   * 将上传的音频流转换为文本
   * @returns {Promise<{code: number, text: string, msg: string}>}
   */
  const audioStreamToText = () => {
    const bb = busboy({ headers: ctx.req.headers });

    return new Promise((resolve, reject) => {
      bb.on('file', async (fieldname, stream, fileInfo) => {
        const { mimeType } = fileInfo;
        if (mimeType !== 'audio/wave') {
          reject({ code: 400, text: '', msg: '只支持wav格式的音频文件' });
          return;
        }

        const result = await speechRecognition(stream).catch((err) => {
          reject({ code: 500, text: '', msg: err });
        });

        resolve({ code: 200, text: result, msg: 'success' });
      });

      ctx.req.pipe(bb);
    });
  };

  const result = await audioStreamToText().catch((err) => {
    return err;
  });
  ctx.body = result;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
```

## 测试

使用postman等工具，发送post请求，上传一个音频文件，查看返回结果。请求地址：`http://localhost:3000/transcribe`。  
完整项目地址：[vosk-node](https://github.com/wansongtao/vosk-node).
