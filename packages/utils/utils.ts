/**
 * @description 获取传入数据的类型，返回类型小写字符串
 * @param obj
 * @returns
 */
export const getDataType = (obj: any): string => {
  let res = Object.prototype.toString.call(obj).split(' ')[1];
  res = res.substring(0, res.length - 1).toLowerCase();
  return res;
};

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

/**
 * @description 希尔排序，改变原数组
 * @param arr 待排序的数组
 * @param fn 比较函数，如：降序 (a, b) => a - b > 0. 默认按字符串比较，升序排序
 * @returns
 */
export const shellSort = <T = unknown>(
  arr: T[],
  fn?: (a: T, b: T) => boolean
): T[] => {
  if (arr.length < 2) {
    return arr;
  }

  // 设置动态间隔
  let h = 1;
  while (h < arr.length / 3) {
    h = h * 3 + 1;
  }

  while (h > 0) {
    for (let i = 0; i < arr.length; i++) {
      let prevIdx = i - h;
      const currVal = arr[i];

      while (
        prevIdx >= 0 &&
        (fn instanceof Function
          ? fn(currVal, arr[prevIdx])
          : String(arr[prevIdx]) > String(currVal))
      ) {
        arr[prevIdx + h] = arr[prevIdx];
        prevIdx -= h;
      }

      arr[prevIdx + h] = currVal;
    }

    h = (h - 1) / 3;
  }

  return arr;
};

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
