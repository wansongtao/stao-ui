import Radio from './BaseRadio.vue'
import { withInstall } from '@stao-ui/utils';

export type RadioInstance = InstanceType<typeof Radio>;
export const BaseRadio = withInstall(Radio);
export default BaseRadio;
