import Tabs from './BaseTabs.vue';
import { withInstall } from '@stao-ui/utils';

export type TabsInstance = InstanceType<typeof Tabs>;
export const BaseTabs = withInstall(Tabs);
export default BaseTabs;
