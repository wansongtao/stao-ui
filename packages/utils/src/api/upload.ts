import axios, { AxiosProgressEvent } from 'axios';

export interface IAliOssUploadRequestDTO {
  accessid: string;
  callback: string;
  dir: string;
  expire: string;
  host: string;
  policy: string;
  signature: string;
}

/**
 * @description 上传文件至阿里云oss接口
 * @param {Object} data
 * @param {string} data.policy 将过期时间和限制文件大小的对象加密后的字符串
 * @param {string} data.OSSAccessKeyId
 * @param {string} data.signature
 * @param {string} data.host 阿里云oss地址
 * @param {string} data.dir 文件存放路径
 * @param {string} [data.callback]
 * @param {File} file 二进制文件
 * @returns {Promise<string>} 成功返回 url
 */
export const uploadAliOSS = (
  data: IAliOssUploadRequestDTO,
  file: File,
  uploadProgressFn?: (progressEvent: AxiosProgressEvent) => void,
  signal?: AbortSignal
) => {
  const formData = new FormData();
  formData.append('name', file.name);
  formData.append('key', data.dir);
  formData.append('policy', data.policy);
  formData.append('OSSAccessKeyId', data.accessid);
  formData.append('signature', data.signature);
  formData.append('success_action_status', '200');
  formData.append('callback', data.callback);
  formData.append('file', file);

  return new Promise<string>((resolve, reject) => {
    axios({
      method: 'post',
      url: data.host,
      headers: {
        'Content-type': 'multipart/form-data;'
      },
      timeout: 600000,
      data: formData,
      signal,
      onUploadProgress: function (progressEvent) {
        if (!uploadProgressFn) {
          return;
        }

        uploadProgressFn(progressEvent);
      }
    })
      .then((res) => {
        if (res.status === 200 && res.data.code !== -1) {
          resolve(data.host + '/' + data.dir);
        }

        reject(res);
      })
      .catch(() => {
        reject();
      });
  });
};
