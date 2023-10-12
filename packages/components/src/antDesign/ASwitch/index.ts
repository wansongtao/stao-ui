import BaseSwitch from './index.vue';
import { withInstall } from '@stao-ui/utils';

export type BaseSwitchInstance = InstanceType<typeof BaseSwitch>;
export const SAntBaseSwitch = withInstall(BaseSwitch);
export default SAntBaseSwitch;
