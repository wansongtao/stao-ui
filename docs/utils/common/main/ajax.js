/**
 * 
 * @template T
 * @param {{
 *    url: string;
 *    timeout?: number;
 *    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH',
 *    data?: any,
 *    params?: { [key: string]: string },
 *    headers?: { [key: string]: string },
 *    responseType?: XMLHttpRequestResponseType
 *  }} param
 * @param {(xhr: XMLHttpRequest) => void} [beforeRequest]
 * @returns {Promise<{ data: T, xhr: XMLHttpRequest }>}
 */
const ajax = (param, beforeRequest) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ data: xhr.response, xhr });
          return;
        }

        reject(new Error(`Request failed with status ${xhr.status}`));
      }
    };

    const {
      url,
      timeout = 5000,
      method = 'GET',
      headers = { 'Content-Type': 'application/json' },
      data,
      params,
      responseType = 'json'
    } = param;

    if (params) {
      const paramsStr = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&');

      xhr.open(method, `${url}?${paramsStr}`, true);
    } else {
      xhr.open(method, url, true);
    }

    xhr.responseType = responseType;
    xhr.timeout = timeout;
    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });

    if (beforeRequest) {
      beforeRequest(xhr);
    }

    if (data && method !== 'GET') {
      if (
        headers['Content-Type'] === 'application/json' &&
        typeof data === 'object'
      ) {
        xhr.send(JSON.stringify(data));
        return;
      }

      xhr.send(data);
      return;
    }

    xhr.send(null);
  });
};
