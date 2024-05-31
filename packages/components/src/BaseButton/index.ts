import Button from './BaseButton.vue';
import { withInstall } from '@stao-ui/utils';

export type BaseButtonInstance = InstanceType<typeof Button>;
export const BaseButton = withInstall(Button);
export default BaseButton;
