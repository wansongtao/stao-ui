// #region getDataType
/**
 * 获取传入数据的类型，返回小写字符串格式
 */
export const getDataType = (obj: unknown): string => {
  let res = Object.prototype.toString.call(obj).split(' ')[1];
  res = res.substring(0, res.length - 1).toLowerCase();
  return res;
};
// #endregion getDataType

// #region debounce
/**
 * @description 防抖函数，一定时间内多次触发，只执行最后触发的一次，可能永远不会执行
 * @param fn 需要防抖的函数
 * @param delay 间隔时间，默认200ms，单位ms
 * @param immediate 第一次是否立即执行，默认false
 * @returns
 */
export const debounce = <T = unknown>(
  fn: (...args: T[]) => void,
  delay: number = 200,
  immediate: boolean = false
) => {
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

// #region throttle
/**
 * @description 节流函数，触发一次后，下次触发需要间隔一定的时间
 * @param fn 需要执行的函数
 * @param delay 间隔时间，默认1s，单位ms
 * @returns
 */
export const throttle = <T = unknown>(
  fn: (...args: T[]) => void,
  delay: number = 1000
) => {
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

// #region curry
export interface ICurryBack<T = unknown, B = unknown> {
  (...params: T[]): B | ICurryBack<T, B>;
}
/**
 * 柯里化：接收一个函数，返回一个新函数，新函数接收的参数数量不足时，会返回一个新函数，直到参数数量足够执行原函数
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

// #region compose
/**
 * 函数式编程实现，从右往左执行，函数返回值会传给下一个执行的函数
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
      return a(b(...args));
    };
  });
};
// #endregion compose

// #region deepClone
/**
 * 深拷贝实现(支持Map、Set、RegExp、Date、Function类型和循环引用，不支持symbol属性)
 */
export const deepClone = <T = unknown>(obj: T) => {
  /**
   * 用来保存引用关系，解决循环引用问题
   */
  const copyObj: any = {};

  const clone = (data: any): T => {
    if (!(data instanceof Object)) {
      return data;
    }

    const newObj: any = Array.isArray(data) ? [] : {};

    for (const key in data) {
      if (!data.hasOwnProperty(key)) {
        continue;
      }

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

// #region getQueryString
/**
 * @description 拼接查询字符串
 * @param data
 * @param isEncode 是否使用encodeURIComponent()将值编码，默认true
 * @returns
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

  const strategies = {
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
  type IKey = keyof typeof strategies;

  const replaceFn = (val: string): string => {
    let func = strategies[val as IKey];
    if (func instanceof Function) {
      return func();
    }

    func = strategies[val.toLowerCase() as IKey];
    if (func instanceof Function) {
      return func();
    }

    // 没有匹配的方法，返回原字符串
    return val;
  };

  return format.replace(/([Yy]{2,4}|[M]+|[Dd]+|[Hh]+|[m]+|[Ss]+)/g, replaceFn);
};
// #endregion formatTime

// #region idleDetection
/**
 * 页面空闲检测
 * @param callback
 * @param timeout 时长，默认60s，单位：秒
 * @returns
 */
export const idleDetection = (callback: () => void, timeout = 60) => {
  let pageTimer: NodeJS.Timeout | undefined;
  let beginTime = 0;

  const onClearTimer = () => {
    pageTimer && clearTimeout(pageTimer);
    pageTimer = undefined;
  };
  const onStartTimer = () => {
    onClearTimer();
    beginTime = Date.now();
    pageTimer = setTimeout(() => {
      callback();
    }, timeout * 1000);
  };

  const onPageVisibility = () => {
    onClearTimer();

    if (document.visibilityState !== 'visible') {
      return;
    }

    const currentTime = Date.now();
    if (currentTime - beginTime >= timeout * 1000) {
      callback();
      return;
    }

    pageTimer = setTimeout(() => {
      callback();
    }, timeout * 1000 - (currentTime - beginTime));
  };

  const startDetection = () => {
    onStartTimer();
    document.addEventListener('keydown', onStartTimer);
    document.addEventListener('mousemove', onStartTimer);
    document.addEventListener('visibilitychange', onPageVisibility);
  };

  const stopDetection = () => {
    onClearTimer();
    document.removeEventListener('keydown', onStartTimer);
    document.removeEventListener('mousemove', onStartTimer);
    document.removeEventListener('visibilitychange', onPageVisibility);
  };

  const restartDetection = () => {
    startDetection();
    stopDetection();
  };

  return {
    startDetection,
    stopDetection,
    restartDetection
  };
};
// #endregion idleDetection

// #region deepFind
/**
 * 深度查找元素
 */
export const deepFind = <T extends Record<string, any>>(
  data: T[],
  compare: (value: T) => boolean,
  childrenKey = 'children'
): T | undefined => {
  let item: T | undefined = undefined;

  for (let i = 0; i < data.length; i++) {
    const value = data[i];
    if (compare(value)) {
      item = value;
      break;
    }

    if (!value[childrenKey]) {
      continue;
    }

    item = deepFind(value[childrenKey], compare, childrenKey);
    if (item !== undefined) {
      break;
    }
  }

  return item;
};
// #endregion deepFind

// #region getSystemTheme
export const getSystemTheme = () => {
  if (!window.matchMedia) {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 7 && hours < 19) {
      return 'light';
    }
    return 'dark';
  }

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const theme = systemTheme.matches ? 'dark' : 'light';
  return theme;
};
// #endregion getSystemTheme

// #region followSystemTheme
export const followSystemTheme = (
  callback: (theme: 'dark' | 'light') => void
) => {
  if (!window.matchMedia) {
    const date = new Date();
    const hours = date.getHours();
    const time = date.getTime();
    let delay = 0;
    let mode: 'light' | 'dark' = 'light';

    if (hours >= 0 && hours < 7) {
      const nextTime = date.setHours(7);
      delay = nextTime - time;
    } else if (hours >= 7 && hours < 19) {
      const nextTime = date.setHours(19);
      delay = nextTime - time;
      mode = 'dark';
    } else {
      const nextTime = date.setHours(23, 59, 59, 999) + 7 * 60 * 60 * 1000;
      delay = nextTime - time;
    }

    setTimeout(() => {
      callback(mode);
    }, delay);
    return;
  }

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  systemTheme.addEventListener('change', (e) => {
    const theme = e.matches ? 'dark' : 'light';
    callback(theme);
  });
};
// #endregion followSystemTheme

// #region deepMap
export const deepMap = <T extends Record<any, any>>(
  data: T[],
  callback: (value: T) => T,
  childrenKey = 'children'
) => {
  return data.map((v) => {
    const newValue = callback(v);
    if (newValue[childrenKey]?.length) {
      (newValue[childrenKey] as T[]) = deepMap(
        newValue[childrenKey],
        callback,
        childrenKey
      );
    }

    return {
      ...newValue
    };
  });
};
// #endregion deepMap
