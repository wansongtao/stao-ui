export class EventBus {
  private listeners: Record<string, Function[]> = {};

  $on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  $emit<T = unknown>(event: string, ...args: T[]) {
    const callbacks = this.listeners[event];
    if (!callbacks) {
      return;
    }

    callbacks.forEach((callback) => {
      callback(...args);
    });
  }

  $off(event: string) {
    delete this.listeners[event];
  }
}
