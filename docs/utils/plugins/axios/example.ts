//#region example1
import request, { instance, type IBaseResponse } from '@utils/plugins/request';

const getUserInfo = () => {
  return request<IBaseResponse<{ name: string; age: number }>>({
    url: '/user/info',
    method: 'GET'
  });
};

const test1 = async () => {
  const [err, data] = await getUserInfo();
  if (err) {
    console.error(err); // AxiosError
    return;
  }
  // { code: 200, message: 'success', data: { name: 'test', age: 18 } }
  console.log(data);
}

// 只会向服务器发送一次请求
test1(); // { code: 200, message: 'success', data: { name: 'test', age: 18 } }
test1(); // { code: 200, message: 'success', data: { name: 'test', age: 18 } }
//#endregion example1

//#region example2
const login = (data: { username: string; password: string }) => {
  return instance.request<IBaseResponse<string>>({
    url: '/login',
    method: 'POST',
    data
  });
}

const test2 = () => {
  login({ username: 'test', password: '123456' }).then((res) => {
    console.log(res.data); // { code: 200, message: 'success', data: 'token' }
  }).catch((err) => {
    console.error(err);
  });
}
//#endregion example2
