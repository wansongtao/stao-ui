import FileSelector from './FileSelector.vue';
import { withInstall } from '@stao-ui/utils';

export type FileSelectorInstance = InstanceType<typeof FileSelector>;

// 组件名
FileSelector.name = 'STaoFileSelector';
export const STaoFileSelector = withInstall(FileSelector);
export default STaoFileSelector;
