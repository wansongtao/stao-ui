import SButton from './SButton.vue';
import { withInstall } from '@stao-ui/utils';

export type SButtonInstance = InstanceType<typeof SButton>;

// 组件名
SButton.name = 'STaoButton';
export const STaoButton = withInstall(SButton);
export default STaoButton;
