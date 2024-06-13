import Checkbox from './BaseCheckbox.vue'
import { withInstall } from '@stao-ui/utils';

export type CheckboxInstance = InstanceType<typeof Checkbox>;
export const BaseCheckbox = withInstall(Checkbox);
export default BaseCheckbox;
