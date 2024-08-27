import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios';

export interface IBaseResponse<T = unknown> {
  code: number;
  msg: string;
  data?: T;
}

interface IConfigHeader {
  headers?: {
    isToken?: boolean;
  };
}

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig & IConfigHeader) => {
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

instance.interceptors.response.use(
  (res: AxiosResponse<IBaseResponse | Blob>) => {
    const data = res.data;

    if (data instanceof Blob || data.code === 200) {
      return res;
    }

    // 业务错误
    // message.error(data.msg);
    return Promise.reject(new AxiosError(data.msg));
  },
  (error: AxiosError) => {
    // 处理取消请求错误
    if (error.code === 'ERR_CANCELED') {
      return Promise.reject(error);
    }

    // 超出 2xx 范围的http状态码都会触发该函数。包括网络错误和超时
    // message.error(error.response?.statusText || error.message);
    return Promise.reject(error);
  }
);

const request = <T extends IBaseResponse | Blob, C = any>(
  config: AxiosRequestConfig<C> & IConfigHeader
) => {
  return new Promise<[error?: AxiosError, data?: T]>((resolve) => {
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
