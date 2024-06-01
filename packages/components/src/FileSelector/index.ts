import SFileSelector from './FileSelector.vue';
import { withInstall } from '@stao-ui/utils';

export type FileSelectorInstance = InstanceType<typeof SFileSelector>;
export const FileSelector = withInstall(SFileSelector);
export default FileSelector;
