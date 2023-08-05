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

export const listenWebSocketClose = (ws: WebSocket) => {
  return new Promise<CloseEvent>((resolve) => {
    ws.onclose = (e) => resolve(e);
  });
};

export const listenWebSocketMessage = <T = string>(ws: WebSocket) => {
  return new Promise<{ data: T; event: MessageEvent }>((resolve) => {
    ws.onmessage = (e) => resolve({ data: e.data, event: e });
  });
};

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
