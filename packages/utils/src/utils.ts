// #region getDataType
/**
 * @description 获取传入数据的类型，返回类型小写字符串
 * @param obj
 * @returns
 */
export const getDataType = (obj: unknown): string => {
  let res = Object.prototype.toString.call(obj).split(' ')[1];
  res = res.substring(0, res.length - 1).toLowerCase();
  return res;
};
// #endregion getDataType

// #region compose
/**
 * @description 函数式编程实现，从左往右执行，函数返回值会传给下一个执行的函数
 * @param funcs
 * @returns
 */
export const compose = <T = unknown>(...funcs: Function[]) => {
  if (funcs.length === 0) {
    return (arg: T) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => {
    return (...args: T[]) => {
      return b(a(...args));
    };
  });
};
// #endregion compose

// #region throttle
/**
 * @description 节流函数，触发一次后，下次触发需要间隔一定的时间
 * @param fn 需要执行的函数
 * @param delay 间隔时间，默认1s，单位ms
 * @returns
 */
export const throttle = <T = unknown>(fn: Function, delay: number = 1000) => {
  if (delay < 0) {
    delay = Math.abs(delay);
  }

  // 浮点数取整
  if (~~delay !== delay) {
    delay = delay | 0;
  }

  let lastTime = 0;
  return function (this: any, ...args: T[]) {
    const nowTime = Date.now();

    if (nowTime - lastTime < delay) {
      return;
    }

    lastTime = nowTime;
    fn.apply(this, args);
  };
};
// #endregion throttle

// #region debounce
/**
 * @description 防抖函数，一定时间内多次触发，只执行最后触发的一次，可能永远不会执行
 * @param fn 需要防抖的函数
 * @param delay 间隔时间，默认200ms，单位ms
 * @param immediate 第一次是否立即执行，默认false
 * @returns
 */
export const debounce = <T = unknown>(
  fn: Function,
  delay: number = 200,
  immediate: boolean = false
) => {
  if (delay < 0) {
    delay = Math.abs(delay);
  }

  // 浮点数取整
  if (~~delay !== delay) {
    delay = delay | 0;
  }

  let timer: NodeJS.Timeout | null = null;
  let isFirst = true;
  return function (this: any, ...args: T[]) {
    timer && clearTimeout(timer);

    if (immediate && isFirst) {
      isFirst = false;
      fn.apply(this, args);
      return;
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
// #endregion debounce

// #region curry
export interface ICurryBack<T = unknown, B = unknown> {
  (...params: T[]): B | ICurryBack<T, B>;
}
/**
 * @description 柯里化：将多变量函数拆解为单变量（或部分变量）的多个函数并依次调用
 * @param fn
 * @param args
 * @returns
 */
export const curry = <T = unknown, B = unknown>(
  fn: Function,
  ...args: T[]
): B | ICurryBack<T, B> => {
  const length = fn.length;

  if (args.length < length) {
    return function (...params: T[]) {
      return curry(fn, ...args, ...params);
    };
  }

  return fn(...args);
};
// #endregion curry

// #region fileSlice
/**
 * @description 将文件切片
 * @param {File} file 文件对象
 * @param {number} [start = 0] 从文件的哪里开始，默认0
 * @param {number} [piece = 1024 * 512] 每一块大小，默认512k
 * @returns {Blob[]} 返回一个文件切片数组
 */
export const fileSlice = (
  file: File,
  start: number = 0,
  piece: number = 1024 * 512
): Blob[] => {
  const total = file.size;
  let end = start + piece;

  // 结束位置不能超出文件大小
  if (end > total) {
    end = total;
  }

  const chunks: Blob[] = [];
  while (end <= total) {
    const blob = file.slice(start, end);
    chunks.push(blob);

    if (end === total) {
      break;
    }

    start = end;
    end = start + piece;

    // 结束位置不能超出文件大小
    if (end > total) {
      end = total;
    }
  }

  return chunks;
};
// #endregion fileSlice

// #region deepClone
/**
 * @description 深拷贝实现(支持Map、Set、RegExp、Date、Function类型和循环引用，不支持symbol属性)
 * @param obj
 * @returns 返回一个新对象
 */
export const deepClone = <T = unknown>(obj: T) => {
  /**
   * 用来保存引用关系，解决循环引用问题
   */
  const copyObj: any = {};

  const clone = (data: any): T => {
    // 简单数据类型直接返回值
    if (!(data instanceof Object)) {
      return data;
    }

    const newObj: any = Array.isArray(data) ? [] : {};

    for (const key in data) {
      // 跳过原型上的属性
      // if (!data.hasOwnProperty(key)) {
      //   continue;
      // }

      // 简单数据类型直接返回值
      if (!(data[key] instanceof Object)) {
        newObj[key] = data[key];
        continue;
      }

      if (data[key] instanceof Date) {
        newObj[key] = new Date(data[key].getTime());
        continue;
      }

      if (data[key] instanceof RegExp) {
        newObj[key] = new RegExp(data[key]);
        continue;
      }

      if (data[key] instanceof Function) {
        // 处理es6简写方法名的问题，例如：{hi() {return 1;}}
        const funcStr = data[key].toString().replace(/^function/, '');
        newObj[key] = new Function(`return function ${funcStr}`)();
        continue;
      }

      if (data[key] instanceof Map) {
        newObj[key] = new Map();

        data[key].forEach((val: any, mapKey: any) => {
          if (!(mapKey instanceof Object) && !(val instanceof Object)) {
            newObj[key].set(mapKey, val);
          } else {
            newObj[key].set(clone(mapKey), clone(val));
          }
        });

        continue;
      }

      if (data[key] instanceof Set) {
        newObj[key] = new Set();
        data[key].forEach((val: any) => {
          if (!(val instanceof Object)) {
            newObj[key].add(val);
          } else {
            newObj[key].add(clone(val));
          }
        });

        continue;
      }

      // 判断是否为循环引用
      if (copyObj[key] === data[key]) {
        newObj[key] = data[key];
        continue;
      }
      copyObj[key] = data[key];

      newObj[key] = clone(data[key]);
    }

    return newObj;
  };

  return clone(obj);
};
// #endregion deepClone

// #region preloadImages
/**
 * @description 预加载图片
 * @param imgs 图片列表
 * @returns 全部加载成功resolve()，有一张图片加载失败reject(url)
 */
export const preloadImages = (imgs: string[]) => {
  /**
   * @description 加载图片
   * @param url
   * @returns 成功resolve()，失败reject(url)
   */
  const loadImg = (url: string) => {
    return new Promise<void>((resolve, reject) => {
      const imgEle = new Image();

      imgEle.onload = () => {
        resolve();
      };

      imgEle.onerror = () => {
        reject(url);
      };

      imgEle.src = url;
    });
  };

  return Promise.all(imgs.map((item) => loadImg(item)));
};
// #endregion preloadImages

// #region convertTimeZone
/**
 * @description 时区转换
 * @param {Date | string | number} time 待转换时间
 * @param {number} timeZone 转换为哪个时区，默认东八区(东区传入1至12，西区传入-1~-12)
 * @param {number} currTimeZone 当前时区，默认本地时区(东区传入1至12，西区传入-1~-12)
 * @returns {Date} 返回对应时区时间
 */
export const convertTimeZone = (
  time: Date | string | number,
  timeZone: number = 8,
  currTimeZone?: number
): Date => {
  let newTime: Date | null = null;

  if (time instanceof Date) {
    newTime = time;
  } else if (typeof time === 'string') {
    // 在safari中，Date构造函数不能识别‘-’
    const str = time.replace('-', '/');
    newTime = new Date(str);

    if (isNaN(newTime as unknown as number)) {
      throw new Error('time argument error');
    }
  } else if (typeof time === 'number') {
    newTime = new Date(time);

    if (isNaN(newTime as unknown as number)) {
      throw new Error('time argument error');
    }
  } else {
    throw new TypeError('time argument type error');
  }

  if (timeZone < -12 || timeZone > 12) {
    throw new Error('timeZone argument error');
  }

  let offset = 0; // 传入时间与格林威治时间的时间差，单位毫秒
  if (currTimeZone === undefined) {
    // 获取本地时间与格林威治时间的时间差
    offset = new Date().getTimezoneOffset() * 60 * 1000;
  } else if (currTimeZone >= -12 && currTimeZone <= 12) {
    offset -= currTimeZone * 60 * 60 * 1000;
  } else {
    throw new Error('currTimeZone argument error');
  }

  const locale = newTime.getTime() + offset + timeZone * 60 * 60 * 1000;
  return new Date(locale);
};
// #endregion convertTimeZone

// #region isLeapYear
/**
 * @description 是否为闰年
 * @param {number} year 年份
 * @returns {boolean} 是true，否false
 */
export const isLeapYear = (year: number) => {
  // 能被400整除为闰年
  if (year % 400 === 0) {
    return true;
  }

  // 能被4整除但不能被100整除为闰年
  if (year % 4 === 0 && year % 100 !== 0) {
    return true;
  }

  return false;
};
// #endregion isLeapYear

// #region downloadFileToLocale
/**
 * @description 使用a标签下载文件到本地
 * @param {string} url 下载地址
 * @param {string} filename 下载文件名，默认使用当前时间
 */
export const downloadFileToLocale = (url: string, filename?: string) => {
  const aElement = document.createElement('a');
  aElement.download = filename || Date.now().toString();
  aElement.href = url;
  aElement.click();
};
// #endregion downloadFileToLocale

// #region getQueryString
/**
 * @description 根据传入的对象，拼接为查询字符串
 * @param data 值为null或undefined跳过
 * @param isEncode 是否使用encodeURIComponent()将值编码，默认true
 * @returns 返回查询字符串（带？），或空字符串
 */
export const getQueryString = (
  data: Record<string, string | number | boolean | null | undefined>,
  isEncode = true
) => {
  let str = '?';

  for (const key in data) {
    if (data[key] === null || data[key] === '' || data[key] === undefined) {
      continue;
    }

    const value = isEncode
      ? encodeURIComponent(data[key] as string | number | boolean)
      : data[key];

    str += `${key}=${value}&`;
  }

  return str.substring(0, str.length - 1);
};
// #endregion getQueryString

// #region filterEmoji
/**
 * @description 过滤emoji表情
 * @param value
 * @returns
 */
export const filterEmoji = (value: string) => {
  const regexp =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

  return value.replace(regexp, '');
};
// #endregion filterEmoji

// #region formatTime
/**
 * @description 格式化时间
 * @param {Date} [date] Date对象，默认当前时间
 * @param {String} [format] 输出格式字符串，默认：yyyy/MM/dd HH:mm:ss。yy: 输出两位数的年份，
 * h：输出12小时制，H：输出24小时制，M：月份，m：分钟，一位字母则不补零
 * @returns {String}
 */
export const formatTime = (
  date: Date = new Date(),
  format: string = 'yyyy/MM/dd HH:mm:ss'
): string => {
  if (!format) {
    return format;
  }

  const formatObj = {
    yy: () => {
      return date.getFullYear().toString().substring(2, 4);
    },
    yyyy: () => {
      return date.getFullYear().toString();
    },
    M: () => {
      const month = date.getMonth() + 1;
      return month.toString();
    },
    MM: () => {
      const month = date.getMonth() + 1;
      return month.toString().padStart(2, '0');
    },
    d: () => {
      return date.getDate().toString();
    },
    dd: () => {
      return date.getDate().toString().padStart(2, '0');
    },
    h: () => {
      let hours = date.getHours();
      if (hours > 12) {
        hours -= 12;
      }

      return hours.toString();
    },
    hh: () => {
      let hours = date.getHours();
      if (hours > 12) {
        hours -= 12;
      }

      return hours.toString().padStart(2, '0');
    },
    H: () => {
      return date.getHours().toString();
    },
    HH: () => {
      return date.getHours().toString().padStart(2, '0');
    },
    m: () => {
      return date.getMinutes().toString();
    },
    mm: () => {
      return date.getMinutes().toString().padStart(2, '0');
    },
    s: () => {
      return date.getSeconds().toString();
    },
    ss: () => {
      return date.getSeconds().toString().padStart(2, '0');
    }
  };

  type key =
    | 'yy'
    | 'yyyy'
    | 'MM'
    | 'M'
    | 'd'
    | 'dd'
    | 'h'
    | 'hh'
    | 'H'
    | 'HH'
    | 'm'
    | 'mm'
    | 's'
    | 'ss';
  const replaceFunc = (val: string): string => {
    let func = formatObj[val as key];
    if (func instanceof Function) {
      return func();
    }

    func = formatObj[val.toLowerCase() as key];
    if (func instanceof Function) {
      return func();
    }

    // 没有匹配的方法，返回原字符串
    return val;
  };

  return format.replace(
    /([Yy]{2,4}|[M]+|[Dd]+|[Hh]+|[m]+|[Ss]+)/g,
    replaceFunc
  );
};
// #endregion formatTime

// #region getMimeTypeByFileName
/**
 * @description 通过文件名获取mime类型
 * @param fileName
 * @returns
 */
export const getMimeTypeByFileName = (fileName: string) => {
  const dotIndex = fileName.lastIndexOf('.');
  if (dotIndex === -1) {
    return '';
  }
  const fileExtension = fileName.substring(dotIndex + 1).toLocaleLowerCase();
  const mimeTypes: Record<string, string> = {
    txt: 'text/plain',
    html: 'text/html',
    htm: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    pdf: 'application/pdf',
    xml: 'application/xml',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    bmp: 'image/bmp',
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'audio/ogg',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    md: 'text/markdown',
    markdown: 'text/markdown'
  };
  return mimeTypes[fileExtension] || '';
};
// #endregion getMimeTypeByFileName

// #region canOpenInBrowser
/**
 * @description 判断文件是否可以用浏览器直接打开
 * @param file
 * @returns
 */
export const canOpenInBrowser = (fileType: string) => {
  if (
    fileType.startsWith('image/') ||
    fileType.startsWith('video/') ||
    fileType.startsWith('audio/') ||
    fileType === 'text/plain' ||
    fileType === 'text/html' ||
    fileType === 'text/css' ||
    fileType === 'application/javascript' ||
    fileType === 'application/json' ||
    fileType === 'application/pdf' ||
    fileType === 'application/xml' ||
    fileType === 'text/xml' ||
    fileType === 'text/markdown'
  ) {
    return true;
  }

  return false;
};
// #endregion canOpenInBrowser

// #region getMaxDayOfMonth
/**
 * 获取一个月的最大天数
 * @param year
 * @param month 月份（1-12）
 * @returns
 */
export const getMaxDayOfMonth = (year: number, month: number) => {
  /**
   * Date对象的构造函数接收月份索引（0-11）。
   * 将月份设置为下个月且天数设置为0，Date对象将自动设置为上个月最后一天。
   */
  const maxDay = new Date(year, month, 0).getDate();
  return maxDay;
};
// #endregion getMaxDayOfMonth
