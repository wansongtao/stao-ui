import axios, { type AxiosError } from 'axios';
import { message } from 'ant-design-vue';
import useUserStore from './store/user';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000
});

instance.interceptors.request.use(
  (config) => {
    // 如果这里的代码出现错误，会触发响应拦截器（不是请求拦截器）的错误事件
    const isToken = (config.headers ?? {}).isToken === true;

    if (isToken) {
      const store = useUserStore();
      const token = store.getToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    if (
      res.request?.responseType === 'blob' ||
      res.request?.responseType === 'arraybuffer'
    ) {
      return res.data;
    }

    const data = res.data as {code: number; msg: string; };
    if (data.code !== 200) {
      message.error(data.msg);
      return Promise.reject(new Error(data.msg || 'Error'));
    }

    return data;
  },
  (error: AxiosError) => {
    // 处理取消请求错误
    if (error.code === 'ERR_CANCELED') {
      return Promise.reject(error);
    }

    // 超出 2xx 范围的http状态码都会触发该函数。包括网络错误和超时
    message.error(error.response?.statusText || error.message);
    return Promise.reject(error);
  }
);

export default instance;
