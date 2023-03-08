import { Modal, ModalFuncProps } from 'ant-design-vue';
import 'ant-design-vue/es/modal/style/css';

/**
 * 显示确认框
 * @param config 详见Ant Design Vue的modal组件参数
 * @param {string | VueNode} config.title 标题，默认“提示”
 * @param {string | VueNode} confit.content 内容，默认“是否确认执行此操作?”
 * @param {string} config.cancelText 取消按钮文字，默认“取消”
 * @param {string} config.okText 确认按钮文字，默认“确认”
 * @param {boolean} config.closable 是否显示右上角的关闭按钮，默认true
 * @param {number} config.zIndex 设置 Modal 的 z-index，默认1000
 * @param {function} config.onCancel 取消回调，默认reject()
 * @param {function} config.onOk 确定回调，默认resolve()
 * @returns 点击确定resolve()，反之reject()
 */
const showConfirm = (config?: ModalFuncProps) => {
  return new Promise<void>((resolve, reject) => {
    const defaultConfig = {
      title: '提示',
      cancelText: '取消',
      okText: '确定',
      content: '是否确认执行此操作?',
      closable: true,
      onOk() {
        resolve();
      },
      onCancel() {
        reject();
      }
    };

    let obj = { ...defaultConfig };
    if (config) {
      obj = Object.assign(obj, config);
    }
    
    Modal.confirm(obj);
  });
};

export default showConfirm;
