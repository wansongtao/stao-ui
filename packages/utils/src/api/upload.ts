import axios, { AxiosProgressEvent } from 'axios';

export interface IAliOssUploadRequestDTO {
  accessid: string;
  callback?: string;
  dir: string;
  expire: string;
  host: string;
  policy: string;
  signature: string;
}

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
  formData.append('file', file);
  if (data.callback) {
    formData.append('callback', data.callback);
  }

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
