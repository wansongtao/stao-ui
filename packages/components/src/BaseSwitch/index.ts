import TSwitch from './BaseSwitch.vue';
import { withInstall } from '@stao-ui/utils';

export type SwitchInstance = InstanceType<typeof TSwitch>;
export const BaseSwitch = withInstall(TSwitch);
export default BaseSwitch;
