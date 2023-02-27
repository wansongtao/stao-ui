import FileSelector from './FileSelector.vue';
import { withInstall } from '@stao-ui/utils/install';

export type FileSelectorInstance = InstanceType<typeof FileSelector>;

export const STaoFileSelector = withInstall<InstanceType<typeof FileSelector>>(
  FileSelector,
  'STaoFileSelector'
);
export default STaoFileSelector;
