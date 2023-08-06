import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css';
import type { MessageArgsProps } from 'ant-design-vue';

/**
 * @description 全局提示，ant-design的message组件
 * @param config
 * @param {string | VueNode} config.content 提示内容
 * @param {number} [config.duration] 自动关闭的延时，单位秒，默认3秒。设为 0 时不自动关闭。
 * @param {string} [config.type] 'info' | 'success' | 'error' | 'warning' | 'loading'
 * @param {Function | VueNode} [config.icon] 自定义图标
 * @param {string | number} [config.key] 当前提示的唯一标志
 * @param {CSSProperties} [config.style] 自定义内联样式
 * @param {string} [config.class] 自定义 CSS class
 * @param {Function} [config.onClose] 关闭时触发的回调函数
 * @param {Function} [config.onClick] 点击 message 时触发的回调函数
 * @returns 返回一个函数，可以调用该函数关闭弹窗
 */
const messageNotice = (config: MessageArgsProps) => {
  return message.open(config);
};

export default messageNotice;
