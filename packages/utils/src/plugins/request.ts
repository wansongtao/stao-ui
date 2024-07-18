import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios';

import { getDataType } from '../common';
import { EventBus } from '../event/eventBus';

import { message } from 'ant-design-vue';

export interface IBaseResponse<T = unknown> {
  code: number;
  msg: string;
  data?: T;
}

interface IConfigHeader {
  headers?: {
    isToken?: boolean;
    isAllowRepetition?: boolean;
  };
}

const getKey = (config: AxiosRequestConfig) => {
  const { method, url, data, params } = config;
  let key = `${method}-${url}`;

  try {
    if (data && getDataType(data) === 'object') {
      key += `-${JSON.stringify(data)}`;
    } else if (getDataType(data) === 'formdata') {
      for (const [k, v] of data.entries()) {
        if (v instanceof Blob) {
          continue;
        }
        key += `-${k}-${v}`;
      }
    }
    if (params && getDataType(params) === 'object') {
      key += `-${JSON.stringify(params)}`;
    }

    key = encodeURIComponent(key);
  } catch (e) {
    console.error(e);
  }

  return key;
};

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const historyRequests = new Map<string, number>();
instance.interceptors.request.use(
  (config) => {
    if (config.headers?.isAllowRepetition !== true) {
      const key = getKey(config);
      config.headers.key = key;
      if (historyRequests.has(key)) {
        return Promise.reject(
          new AxiosError('Redundant request', 'ERR_REPEATED', config)
        );
      }
      historyRequests.set(key, 1);
    }

    if (config.headers.isToken !== false) {
      const token = 'token';
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const responseInterceptor = (res: AxiosResponse<IBaseResponse | Blob>) => {
  const data = res.data;
  const result: [err?: AxiosError, data?: AxiosResponse<IBaseResponse | Blob>] =
    [];

  if (data instanceof Blob || data.code === 200) {
    result[1] = res;
  } else {
    // 业务错误
    message.error(data.msg);
    result[0] = new AxiosError(data.msg);
  }

  return result;
};

const eventBus = new EventBus<{
  [key: string]: (
    data?: AxiosResponse<IBaseResponse | Blob>,
    error?: AxiosError
  ) => void;
}>();

instance.interceptors.response.use(
  (res) => {
    const [err, data] = responseInterceptor(res);

    // 如果存在重复请求，则触发事件，将结果返回给请求
    const key = res.config.headers.key as string;
    if (historyRequests.has(key)) {
      historyRequests.delete(key);
      eventBus.$emit(key, data, err);
    }

    return data !== undefined ? data : Promise.reject(err);
  },
  (error: AxiosError) => {
    // 处理重复请求
    if (error.code === 'ERR_REPEATED') {
      return new Promise((resolve, reject) => {
        const config = error.config!;
        const key = config.headers.key as string;
        const callback = (
          res?: AxiosResponse<IBaseResponse | Blob>,
          err?: AxiosError
        ) => {
          res ? resolve(res) : reject(err);
          eventBus.$off(key, callback);
        };
        eventBus.$on(key, callback);
      });
    }

    // 请求错误，如果存在重复请求，则触发事件，将错误结果返回给对应请求
    const key = error?.config?.headers.key as string;
    if (historyRequests.has(key)) {
      historyRequests.delete(key);
      eventBus.$emit(key, undefined, error);
    }

    // 处理取消请求错误
    if (error.code === 'ERR_CANCELED') {
      return Promise.reject(error);
    }

    // 超出 2xx 范围的http状态码都会触发该函数。包括网络错误和超时
    message.error(error.response?.statusText || error.message);
    return Promise.reject(error);
  }
);

// 错误优先且类型友好的请求方法
const request = <T extends IBaseResponse | Blob, C = any>(
  config: AxiosRequestConfig<C> & IConfigHeader
) => {
  return new Promise<[error?: AxiosError, result?: T]>((resolve) => {
    instance
      .request<T>(config)
      .then((res) => {
        resolve([undefined, res.data]);
      })
      .catch((error: AxiosError) => {
        resolve([error]);
      });
  });
};

export default request;
