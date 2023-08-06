// #region createWebSocket
/**
 * 创建一个 WebSocket 连接
 * @param url
 * @param protocols 协议字符串或字符串数组
 * @returns
 */
export const createWebSocket = (
  url: string,
  protocols: string | string[] = ''
) => {
  return new Promise<WebSocket>((resolve, reject) => {
    const ws = new WebSocket(url, protocols);
    ws.onopen = () => resolve(ws);
    ws.onerror = (err) => reject(err);
  });
};
// #endregion createWebSocket

// #region onCloseWebSocket
export const onCloseWebSocket = (ws: WebSocket) => {
  return new Promise<CloseEvent>((resolve) => {
    ws.onclose = (e) => resolve(e);
  });
};
// #endregion onCloseWebSocket

// #region onMessageWebSocket
export const onMessageWebSocket = <T = string>(ws: WebSocket) => {
  return new Promise<{ data: T; event: MessageEvent }>((resolve) => {
    ws.onmessage = (e) => resolve({ data: e.data, event: e });
  });
};
// #endregion onMessageWebSocket

// #region sendMessageWebSocket
export const sendMessageWebSocket = (
  ws: WebSocket,
  message: string | ArrayBuffer | Blob | ArrayBufferView
) => {
  return new Promise<void>((resolve, reject) => {
    if (ws.readyState !== WebSocket.OPEN) {
      reject('WebSocket 连接没有开启');
      return;
    }
    ws.send(message);
    resolve();
  });
};
// #endregion sendMessageWebSocket
