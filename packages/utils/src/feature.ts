// #region isPrime
/**
 * @description 是否为素数
 * @param {number} num 一个正整数
 * @returns {boolean}
 */
export const isPrime = (num: number): boolean => {
  if (!Number.isInteger(num)) {
    return false;
  }

  if (num <= 1) {
    return false;
  }

  // 只需要判断该数是否能整除，2至该数的开平方中的任何一个数
  let sqrtNum = Math.sqrt(num);
  if (Number.isInteger(sqrtNum)) {
    return false;
  }

  sqrtNum = Math.floor(sqrtNum);
  while (sqrtNum >= 2) {
    if (num % sqrtNum === 0) {
      return false;
    }

    sqrtNum--;
  }

  return true;
};
// #endregion isPrime

// #region shellSort
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
// #endregion shellSort

// #region aliOssImageResize
/**
 * @description 阿里云图片缩放
 * 详情参考：https://help.aliyun.com/document_detail/44688.html?spm=a2c4g.11186623.6.742.e60658cduqjUhj
 * @param {string} url 阿里云图片链接
 * @param {object} data
 * @param {string} [data.m='fill'] 缩放模式，默认fill，等比缩放对超出部分进行居中裁剪
 * @param {number} [data.w] 宽度
 * @param {number} [data.h] 高度
 * @param {number} [data.l] 指定长边
 * @param {number} [data.s] 指定短边
 * @param {number} [data.limit] 指定当目标缩放图大于原图时是否进行缩放。
 * @param {string} [data.color] 当缩放模式选择为pad（缩放填充）时，可以设置填充的颜色。
 */
export const aliOssImageResize = (
  url: string,
  data: {
    m: 'lfit' | 'mfit' | 'fill' | 'pad' | 'fixed';
    w: number;
    h: number;
    l: number;
    s: number;
    limit: 0 | 1;
    color: string;
  }
) => {
  let suffix = 'x-oss-process=image/resize';

  if (data.m) {
    suffix += `,m_${data.m}`;
  } else {
    suffix += ',m_fill';
  }

  if (data.w) {
    suffix += `,w_${data.w}`;
  }

  if (data.h) {
    suffix += `,h_${data.h}`;
  }

  if (data.l) {
    suffix += `,l_${data.l}`;
  }

  if (data.s) {
    suffix += `,s_${data.s}`;
  }

  if (data.limit) {
    suffix += `,limit_${data.limit}`;
  }

  if (data.color) {
    suffix += `,color_${data.color}`;
  }

  if (url.indexOf('?') > -1) {
    // eslint-disable-next-line no-param-reassign
    url += `&${suffix}`;
  } else {
    // eslint-disable-next-line no-param-reassign
    url += `?${suffix}`;
  }

  return url;
};
// #endregion aliOssImageResize

// #region changeCarousel
/**
 * 切换轮播图
 * @param {object} options
 * @param {HTMLElement} options.ele 轮播图容器元素
 * @param {number} options.index 要切换到的索引，从0开始
 * @param {'horizontal' | 'vertical'} options.direction
 * @param {number} options.duration 动画时长，单位ms（默认500ms）
 * @param {string} options.timingFunc 动画函数（默认ease）
 * @param {(currentIndex: number) => void} options.beforeChange 切换前的回调
 * @param {(currentIndex: number) => void} options.afterChange 切换后的回调
 */
export const changeCarousel = ({
  index,
  ele,
  duration = 500,
  direction = 'horizontal',
  timingFunc = 'ease',
  beforeChange,
  afterChange
}: {
  index: number;
  ele: HTMLElement;
  duration?: number;
  direction?: 'horizontal' | 'vertical';
  timingFunc?: string;
  beforeChange?: (currentIndex: number) => void;
  afterChange?: (currentIndex: number) => void;
}) => {
  if (!ele || ele.style.display === 'none' || !ele.children.length) {
    return;
  }

  const emitAfterChange = (currentIndex: number, duration: number) => {
    if (!afterChange) {
      return;
    }

    if (duration <= 0) {
      afterChange(currentIndex);
      return;
    }

    setTimeout(() => {
      afterChange(currentIndex);
    }, duration);
  };

  const filterStyle = (style: string, timingFunction = '') => {
    if (!style) {
      return '';
    }

    const regexp = new RegExp(
      `(transition: transform [0-9]+ms ${timingFunction} 0s; ?)?(transform: translate3d\\(-?[0-9]+px, -?[0-9]+px, 0px\\); ?)?`,
      'g'
    );

    return style.replace(regexp, '');
  };

  const translate3d = {
    horizontal: (x: number) => `translate3d(${x}px, 0px, 0px)`,
    vertical: (y: number) => `translate3d(0px, ${y}px, 0px)`
  } as const;
  const getTranslate3d = translate3d[direction];

  const itemTotal = ele.childElementCount;
  if (index < 0) {
    index = itemTotal - 1;
  } else if (index >= itemTotal) {
    index = 0;
  }

  if (beforeChange) {
    beforeChange(index);
  }

  const style = ele.getAttribute('style') ?? '';
  const nativeStyle = filterStyle(style, timingFunc);
  const itemSize =
    direction === 'horizontal' ? ele.clientWidth : ele.clientHeight;

  // 从最后一个切换到第一个，需要做特殊处理，以实现无缝滚动的效果
  if (
    index === 0 &&
    style.indexOf(getTranslate3d(-(itemTotal - 1) * itemSize)) > -1
  ) {
    const childStyle = filterStyle(
      ele.children[0].getAttribute('style') ?? '',
      timingFunc
    );

    // 将第一个子元素移动到最后一个元素的后面
    ele.children[0].setAttribute(
      'style',
      `${childStyle};transform: ${getTranslate3d(itemSize * itemTotal)};`
    );

    ele.setAttribute(
      'style',
      `${nativeStyle}transition: transform ${duration}ms ${timingFunc} 0s; transform: ${getTranslate3d(
        -(itemSize * itemTotal)
      )};`
    );

    // 等动画结束后，将第一个子元素复位
    if (duration <= 0) {
      ele.setAttribute(
        'style',
        `${nativeStyle}transform: translate3d(0px, 0px, 0px);`
      );
      ele.children[0].setAttribute('style', childStyle);
    } else {
      setTimeout(() => {
        ele.setAttribute(
          'style',
          `${nativeStyle}transform: translate3d(0px, 0px, 0px);`
        );
        ele.children[0].setAttribute('style', childStyle);
      }, duration);
    }
    emitAfterChange(index, duration);
    return;
  }

  // 从第一个切换到最后一个
  if (
    index === itemTotal - 1 &&
    (style.indexOf(getTranslate3d(0)) > -1 || style.indexOf('transform') === -1)
  ) {
    const childStyle = filterStyle(
      ele.children[index].getAttribute('style') ?? '',
      timingFunc
    );

    // 将最后一个子元素移动到第一个元素的前面
    ele.children[index].setAttribute(
      'style',
      `${childStyle};transform: ${getTranslate3d(-itemSize * itemTotal)};`
    );

    ele.setAttribute(
      'style',
      `${nativeStyle}transition: transform ${duration}ms ${timingFunc} 0s; transform: ${getTranslate3d(
        itemSize
      )};`
    );

    // 等动画结束后，将最后一个子元素复位
    if (duration <= 0) {
      ele.children[index].setAttribute('style', childStyle);
      ele.setAttribute(
        'style',
        `${nativeStyle}transform: ${getTranslate3d(-index * itemSize)};`
      );
    } else {
      setTimeout(() => {
        ele.children[index].setAttribute('style', childStyle);
        ele.setAttribute(
          'style',
          `${nativeStyle}transform: ${getTranslate3d(-index * itemSize)};`
        );
      }, duration);
    }

    emitAfterChange(index, duration);
    return;
  }

  ele.setAttribute(
    'style',
    `${nativeStyle}transition: transform ${duration}ms ${timingFunc} 0s; transform: ${getTranslate3d(
      -index * itemSize
    )};`
  );
  emitAfterChange(index, duration);
};
// #endregion changeCarousel

// #region getPseudoRandomNumber
/**
 * 获取伪随机数
 * @param {number} [min=0] 最小值，默认0
 * @param {number} [max=65532] 最大值，默认65532
 * @returns {number}
 */
export const getPseudoRandomNumber = (
  min: number = 0,
  max: number = 65535
): number => {
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }

  const arr = new Uint16Array(1);
  const maxNum = 65535;
  let randomNum = 0;
  if (
    typeof window !== 'undefined' &&
    window.crypto &&
    window.crypto.getRandomValues
  ) {
    randomNum = window.crypto.getRandomValues(arr)[0] / maxNum;
  } else {
    randomNum = Math.random();
  }

  return Math.ceil(randomNum * (max - min) + min);
};
// #endregion getPseudoRandomNumber

// #region createArray
/**
 * 创建指定长度并填充预定值的数组
 * @param len
 * @param value
 * @returns
 */
export const createArray = <T = number>(len: number, value: T): T[] => {
  if (typeof Array.from !== 'function') {
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(value);
    }
    return arr;
  }

  const arr = Array.from({ length: len }, () => value);
  return arr;
};
// #endregion createArray

// #region getSystemTheme
/**
 * 获取系统明暗模式
 * @param autoFollow 自动跟随系统明暗模式回调
 * @returns
 */
export const getSystemTheme = (
  autoFollow?: (mode: 'dark' | 'light') => void
) => {
  if (!window.matchMedia) {
    const date = new Date();
    const hours = date.getHours();

    if (autoFollow) {
      const time = date.getTime();
      let delay = 0;
      let mode: 'light' | 'dark' = 'light';

      if (hours >= 0 && hours < 7) {
        const lastTime = date.setHours(7);
        delay = lastTime - time;
      } else if (hours >= 7 && hours < 19) {
        const lastTime = date.setHours(19);
        delay = lastTime - time;
        mode = 'dark';
      } else {
        const lastTime = date.setHours(23, 59, 59, 999) + 7 * 60 * 60 * 1000;
        delay = lastTime - time;
      }

      setTimeout(() => {
        autoFollow(mode);
        getSystemTheme(autoFollow);
      }, delay);
    }

    if (hours >= 7 && hours < 19) {
      return 'light';
    }

    return 'dark';
  }

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const theme = systemTheme.matches ? 'dark' : 'light';

  if (autoFollow) {
    systemTheme.addEventListener('change', (e) => {
      const theme = e.matches ? 'dark' : 'light';
      autoFollow(theme);
    });
  }
  return theme;
};
// #endregion getSystemTheme

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

// #region canOpenInBrowser
/**
 * @description 判断文件是否可以用浏览器直接打开
 * @param fileType
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

// #region getMimeType
/**
 * @description 通过文件名获取mime类型
 * @param fileName
 * @returns
 */
export const getMimeType = (fileName: string) => {
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
// #endregion getMimeType


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

