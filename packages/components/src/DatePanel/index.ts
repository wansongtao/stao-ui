import DatePanel from './index.vue';
import { withInstall } from '@stao-ui/utils';

export type SDatePanelInstance = InstanceType<typeof DatePanel>;
export const SDatePanel = withInstall(DatePanel);
export default SDatePanel;
