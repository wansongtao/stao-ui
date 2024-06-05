import { EventBus } from '@utils/event/eventBus';

export const eventBus = new EventBus<{
  // 定义事件名称和参数类型
  test: (msg: string) => void;
}>();
