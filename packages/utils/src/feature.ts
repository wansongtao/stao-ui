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
