import axios, {
  type AxiosRequestConfig,
  AxiosError,
  type AxiosResponse
} from 'axios';
import { message } from 'ant-design-vue';

import { getDataType } from './utils';
import { EventBus } from './event/eventBus';

interface IBaseResponse {
  code: number;
  msg: string;
  data?: unknown;
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
  } catch (e) {
    console.error(e);
  }

  return key;
};

const historyRequests = new Map<string, number>();

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;'
  }
});

instance.interceptors.request.use(
  (config) => {
    const key = getKey(config);
    config.headers.key = key;
    if (historyRequests.has(key)) {
      config.headers.requestTime = Date.now();
      return Promise.reject(
        new AxiosError('Redundant request', 'ERR_REPEATED', config)
      );
    }
    historyRequests.set(key, 1);

    if (config.headers.isToken !== false) {
      const token = 'token'
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
  const result: [
    AxiosResponse<IBaseResponse | Blob> | undefined,
    AxiosError | undefined
  ] = [undefined, undefined];

  if (data instanceof Blob || data.code === 200) {
    result[0] = res;
  } else {
    // 业务错误
    message.error(data.msg);
    result[1] = new AxiosError(data.msg);
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
    const [data, error] = responseInterceptor(res);

    // 如果存在重复请求，则触发事件，将结果返回给请求
    const key = res.config.headers.key as string;
    if (historyRequests.has(key)) {
      historyRequests.delete(key);
      eventBus.$emit(key, data, error);
    }

    return data !== undefined ? data : Promise.reject(error);
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

        // 处理超时
        const timeout = config.timeout || 5000;
        const requestTime = config.headers.requestTime as number;
        const now = Date.now();
        if (now - requestTime > timeout) {
          historyRequests.delete(key);
          const error = new AxiosError(
            `timeout of ${timeout}ms exceeded`,
            'ECONNABORTED',
            config
          );
          error.name = 'AxiosError';
          eventBus.$emit(key, undefined, error);
        }
      });
    }

    // 如果存在重复请求，则触发事件，将错误结果返回给请求
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

export const request = <T extends IBaseResponse | Blob, C = any>(
  config: AxiosRequestConfig<C>
) => {
  return new Promise<[result?: T, error?: AxiosError]>(
    (resolve) => {
      instance
        .request<IBaseResponse | Blob>(config)
        .then((res) => {
          resolve([res.data as T]);
        })
        .catch((error: AxiosError) => {
          resolve([undefined, error]);
        });
    }
  );
};

export default instance;
