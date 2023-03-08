export interface IConfig<T> {
  key: string;
  value: T;
  isLocalStorage?: boolean;
  maxAge?: number;
  prefix?: string;
}

interface IStorageData<T = unknown> {
  data: T,
  expire: number
}

/**
 * 默认前缀
 */
const PREFIX = 'sTao-';

/**
 * 本地/会话存储，支持设置过期时间
 * @param config
 * @param config.key 键
 * @param config.value 值
 * @param config.isLocalStorage true-本地存储  false-会话存储，默认 true
 * @param config.maxAge 多少秒后过期，默认不过期
 * @param config.prefix key的前缀，不传入将使用设置的默认前缀（使用prefix+key作为name）
 * @returns
 */
export const setStorage = <T = unknown>({
  key,
  value,
  isLocalStorage = true,
  maxAge,
  prefix = PREFIX
}: IConfig<T>) => {
  const storage: IStorageData = { data: value, expire: 0 };

  if (maxAge) {
    storage.expire = Date.now() + maxAge * 1000;
  }

  try {
    const value = JSON.stringify(storage);
    const name = `${prefix}${key}`;

    if (isLocalStorage) {
      localStorage.setItem(name, value);
      return;
    }

    sessionStorage.setItem(name, value);
  } catch (ex) {
    console.warn(ex);
  }
};

/**
 * 取出本地/会话存储中未过期的数据，已过期、未找到返回null
 * @param key
 * @param isLocalStorage true-本地存储  false-会话存储，默认 true
 * @param prefix 前缀，不传则采用设置的默认前缀（使用prefix+key作为name）
 * @returns
 */
export const getStorage = <T = unknown>(
  key: string,
  isLocalStorage: boolean = true,
  prefix: string = PREFIX
): T | null => {
  const name = `${prefix}${key}`;
  const storage = isLocalStorage
    ? localStorage.getItem(name)
    : sessionStorage.getItem(name);

  if (storage === null) {
    console.warn(`not found ${name}`);
    return null;
  }

  try {
    const value: IStorageData<T> = JSON.parse(storage);
    if (value.expire && value.expire <= Date.now()) {
      console.warn(`${name}: data expired!`);
      return null;
    }

    return value.data;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

/**
 * 删除本地/会话存储中的对应数据
 * @param key
 * @param isLocalStorage true-本地存储  false-会话存储，默认 true
 * @param prefix 前缀，不传则采用设置的默认前缀（使用prefix+key作为name）
 * @returns
 */
export const removeStorage = (
  key: string,
  isLocalStorage: boolean = true,
  prefix: string = PREFIX
) => {
  const name = `${prefix}${key}`;

  if (isLocalStorage) {
    localStorage.removeItem(name);
  } else {
    sessionStorage.removeItem(name);
  }
};
