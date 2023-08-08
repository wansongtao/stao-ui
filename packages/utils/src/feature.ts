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
