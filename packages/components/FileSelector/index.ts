import FileSelector from './FileSelector.vue';
import { withInstall } from '@stao-ui/utils/install';

export type FileSelectorInstance = InstanceType<typeof FileSelector>;
export * from './FileSelector.vue';

// 组件名
FileSelector.name = 'STaoFileSelector';
export const STaoFileSelector = withInstall(FileSelector);
export default STaoFileSelector;
