import Switch from './index.vue';
import { withInstall } from '@stao-ui/utils';

export type SSwitchInstance = InstanceType<typeof Switch>;
export const SSwitch = withInstall(Switch);
export default SSwitch;
