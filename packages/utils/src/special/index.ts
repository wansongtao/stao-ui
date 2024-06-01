// #region ajax
/**
 * 使用XHR发送请求，获取数据
 */
export const ajax = <T = unknown>(param: {
  url: string;
  timeout?: number;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';
  data?: any;
  params?: { [key: string]: string };
  headers?: { [key: string]: string };
  responseType?: XMLHttpRequestResponseType;
  beforeRequest?: (xhr: XMLHttpRequest) => void;
}): Promise<{ data: T; xhr: XMLHttpRequest }> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ data: xhr.response, xhr });
          return;
        }

        reject(new Error(`Request failed with status ${xhr.status}`));
      }
    };

    if (param.beforeRequest) {
      param.beforeRequest(xhr);
    }

    const {
      url,
      timeout = 5000,
      method = 'GET',
      headers = { 'Content-Type': 'application/json' },
      data,
      params,
      responseType = 'json'
    } = param;

    if (params) {
      const paramsStr = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&');

      xhr.open(method, `${url}?${paramsStr}`, true);
    } else {
      xhr.open(method, url, true);
    }

    xhr.responseType = responseType;
    xhr.timeout = timeout;
    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });

    if (data && method !== 'GET') {
      if (
        headers['Content-Type'] === 'application/json' &&
        typeof data === 'object'
      ) {
        xhr.send(JSON.stringify(data));
        return;
      }

      xhr.send(data);
      return;
    }

    xhr.send(null);
  });
};
// #endregion ajax

// #region fileSlice
/**
 * @description 文件切片
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
  if (end > total) {
    end = total;
  }

  const chunks: Blob[] = [];
  while (end <= total) {
    const blob = file.slice(start, end);
    chunks.push(blob);

    start = end;
    end = start + piece;

    if (end > total) {
      end = total;
    }
  }

  return chunks;
};
// #endregion fileSlice

// #region filterEmoji
export const filterEmoji = (value: string) => {
  const regexp =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

  return value.replace(regexp, '');
};
// #endregion filterEmoji

// #region changeCarousel
/**
 * 切换轮播图
 * @param {object} options
 * @param {HTMLElement} options.el 轮播图容器元素
 * @param {number} options.index 要切换到的索引，从0开始
 * @param {'horizontal' | 'vertical'} options.direction
 * @param {number} options.duration 动画时长，单位ms（默认500ms）
 * @param {string} options.timingFunc 动画函数（默认ease）
 * @param {(currentIndex: number) => void} options.beforeChange 切换前的回调
 * @param {(currentIndex: number) => void} options.afterChange 切换后的回调
 */
export const changeCarousel = ({
  index,
  el,
  duration = 500,
  direction = 'horizontal',
  timingFunc = 'ease',
  beforeChange,
  afterChange
}: {
  index: number;
  el: HTMLElement;
  duration?: number;
  direction?: 'horizontal' | 'vertical';
  timingFunc?: string;
  beforeChange?: (currentIndex: number) => void;
  afterChange?: (currentIndex: number) => void;
}) => {
  if (!el || el.style.display === 'none' || !el.children.length) {
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

  const itemTotal = el.childElementCount;
  if (index < 0) {
    index = itemTotal - 1;
  } else if (index >= itemTotal) {
    index = 0;
  }

  if (beforeChange) {
    beforeChange(index);
  }

  const style = el.getAttribute('style') ?? '';
  const nativeStyle = filterStyle(style, timingFunc);
  const itemSize =
    direction === 'horizontal' ? el.clientWidth : el.clientHeight;

  // 从最后一个切换到第一个，需要做特殊处理，以实现无缝滚动的效果
  if (
    index === 0 &&
    style.indexOf(getTranslate3d(-(itemTotal - 1) * itemSize)) > -1
  ) {
    const childStyle = filterStyle(
      el.children[0].getAttribute('style') ?? '',
      timingFunc
    );

    // 将第一个子元素移动到最后一个元素的后面
    el.children[0].setAttribute(
      'style',
      `${childStyle};transform: ${getTranslate3d(itemSize * itemTotal)};`
    );

    el.setAttribute(
      'style',
      `${nativeStyle}transition: transform ${duration}ms ${timingFunc} 0s; transform: ${getTranslate3d(
        -(itemSize * itemTotal)
      )};`
    );

    // 等动画结束后，将第一个子元素复位
    if (duration <= 0) {
      el.setAttribute(
        'style',
        `${nativeStyle}transform: translate3d(0px, 0px, 0px);`
      );
      el.children[0].setAttribute('style', childStyle);
    } else {
      setTimeout(() => {
        el.setAttribute(
          'style',
          `${nativeStyle}transform: translate3d(0px, 0px, 0px);`
        );
        el.children[0].setAttribute('style', childStyle);
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
      el.children[index].getAttribute('style') ?? '',
      timingFunc
    );

    // 将最后一个子元素移动到第一个元素的前面
    el.children[index].setAttribute(
      'style',
      `${childStyle};transform: ${getTranslate3d(-itemSize * itemTotal)};`
    );

    el.setAttribute(
      'style',
      `${nativeStyle}transition: transform ${duration}ms ${timingFunc} 0s; transform: ${getTranslate3d(
        itemSize
      )};`
    );

    // 等动画结束后，将最后一个子元素复位
    if (duration <= 0) {
      el.children[index].setAttribute('style', childStyle);
      el.setAttribute(
        'style',
        `${nativeStyle}transform: ${getTranslate3d(-index * itemSize)};`
      );
    } else {
      setTimeout(() => {
        el.children[index].setAttribute('style', childStyle);
        el.setAttribute(
          'style',
          `${nativeStyle}transform: ${getTranslate3d(-index * itemSize)};`
        );
      }, duration);
    }

    emitAfterChange(index, duration);
    return;
  }

  el.setAttribute(
    'style',
    `${nativeStyle}transition: transform ${duration}ms ${timingFunc} 0s; transform: ${getTranslate3d(
      -index * itemSize
    )};`
  );
  emitAfterChange(index, duration);
};
// #endregion changeCarousel

// #region getMonthMaxDay
/**
 * 获取一个月的最大天数
 * @param year
 * @param month 月份（1-12）
 * @returns
 */
export const getMonthMaxDay = (year: number, month: number) => {
  /**
   * Date对象的构造函数接收月份索引（0-11）。
   * 将月份设置为下个月且天数设置为0，Date对象将自动设置为上个月最后一天。
   */
  const maxDay = new Date(year, month, 0).getDate();
  return maxDay;
};
// #endregion getMonthMaxDay

// #region isLeapYear
export const isLeapYear = (year: number) => {
  if (year % 400 === 0) {
    return true;
  }

  if (year % 4 === 0 && year % 100 !== 0) {
    return true;
  }

  return false;
};
// #endregion isLeapYear

// #region getPseudoRandomNumber
/**
 * 获取伪随机数
 * @param {number} [min=0] 最小值，默认0
 * @param {number} [max=65532] 最大值，默认65532
 * @returns
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

// #region fillArray
export const fillArray = <T = number>(
  length: number,
  getValue: () => T
): T[] => {
  if (typeof Array.from !== 'function') {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(getValue());
    }
    return arr;
  }

  const arr = Array.from({ length }, getValue);
  return arr;
};
// #endregion fillArray
