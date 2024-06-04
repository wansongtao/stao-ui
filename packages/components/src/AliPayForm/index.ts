import BaseAliPayForm from './AliPayForm.vue';
import { withInstall } from '@stao-ui/utils';

export type BaseAliPayFormInstance = InstanceType<typeof BaseAliPayForm>;
export const AliPayForm = withInstall(BaseAliPayForm);
export default AliPayForm;
