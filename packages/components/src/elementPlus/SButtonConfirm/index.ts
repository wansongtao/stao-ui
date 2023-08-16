import ButtonConfirm from './index.vue';
import { withInstall } from '@stao-ui/utils';

export type ButtonConfirmInstance = InstanceType<typeof ButtonConfirm>;
export const SElButtonConfirm = withInstall(ButtonConfirm);
export default SElButtonConfirm;
