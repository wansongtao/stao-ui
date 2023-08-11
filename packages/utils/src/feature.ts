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

// #region ajax
/**
 * 使用XHR发送请求，获取数据
 * @param param
 * @param beforeRequest
 * @returns
 */
export const ajax = <T = unknown>(
  param: {
    url: string;
    timeout?: number;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';
    data?: any;
    params?: { [key: string]: string };
    headers?: { [key: string]: string };
    responseType?: XMLHttpRequestResponseType;
  },
  beforeRequest?: (xhr: XMLHttpRequest) => void
): Promise<{ data: T; xhr: XMLHttpRequest }> => {
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

    if (beforeRequest) {
      beforeRequest(xhr);
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

// #region changeCarousel
/**
 * 切换轮播图
 * @param {object} options
 * @param {HTMLElement} options.ele 轮播图容器元素
 * @param {number} options.index 要切换到的索引
 * @param {(idx: number) => void} options.changeIdx 最后一个切换到第一个时或
 * 第一个切换到最后一个时的回调函数，参数为当前索引
 * @param {'horizontal' | 'vertical'} options.direction
 * @param {number} options.duration 动画时长，单位ms（默认500ms）
 */
export const changeCarousel = ({
  index,
  ele,
  changeIdx,
  duration = 500,
  direction = 'horizontal'
}: {
  index: number;
  ele: HTMLElement;
  changeIdx: (idx: number) => void;
  duration: number;
  direction: 'horizontal' | 'vertical';
}) => {
  if (!ele || ele.style.display === 'none' || !ele.children.length) {
    return;
  }

  const itemSize =
    direction === 'horizontal' ? ele.clientWidth : ele.clientHeight;
  const translate = direction === 'horizontal' ? 'translateX' : 'translateY';

  const moveDistance = -index * itemSize;
  let style = ele.getAttribute('style') ?? '';
  if (style) {
    style = style.replace(
      /(transition-duration: [0-9]+ms;[ ]?)?(transform: translate[XY]\([-]?[0-9]+px\);[ ]?)?/g,
      ''
    );
  }

  ele.setAttribute(
    'style',
    `${style}transition-duration: ${duration}ms; transform: ${translate}(${moveDistance}px);`
  );

  const itemTotal = ele.childElementCount;
  // 从最后一个切换到第一个，需要做特殊处理，以实现无缝滚动的效果
  if (index === itemTotal) {
    // 将第一个子元素移动到最后一个元素的后面
    const childStyle = ele.children[0].getAttribute('style') ?? '';
    const styleStr = childStyle.replace('[object CSSStyleDeclaration];', '');

    ele.children[0].setAttribute(
      'style',
      `${styleStr};transform: ${translate}(${-moveDistance}px);`
    );

    if (typeof changeIdx === 'function') {
      changeIdx(0);
    }

    // 当移动到第一项时，等动画结束后，重置样式
    setTimeout(() => {
      ele.setAttribute('style', `${style}transform: ${translate}(0px);`);

      ele.children[0].setAttribute('style', styleStr);
    }, duration);
    return;
  }

  // 从第一个切换到最后一个，做特殊处理以实现无缝滚动效果
  if (index === -1) {
    const lastIdx = itemTotal - 1;
    const moveSize = lastIdx * itemSize;
    const childStyle = ele.children[lastIdx].getAttribute('style') ?? '';
    const styleStr = childStyle.replace('[object CSSStyleDeclaration];', '');

    ele.children[lastIdx].setAttribute(
      'style',
      `${styleStr}transform: ${translate}(-${itemSize * itemTotal}px);`
    );

    if (typeof changeIdx === 'function') {
      changeIdx(lastIdx);
    }

    setTimeout(() => {
      ele.setAttribute(
        'style',
        `${style}transform: ${translate}(-${moveSize}px);`
      );
      ele.children[lastIdx].setAttribute('style', styleStr);
    }, duration);
  }
};
// #endregion changeCarousel
