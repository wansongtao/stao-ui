import CodeForm from './index.vue';
import { withInstall } from '@stao-ui/utils';

export type SCodeFormInstance = InstanceType<typeof CodeForm>;
export const SCodeForm = withInstall(CodeForm);
export default SCodeForm;
