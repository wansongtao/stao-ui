import Tabs from './index.vue';
import { withInstall } from '@stao-ui/utils';

export type STabsInstance = InstanceType<typeof Tabs>;
export const STabs = withInstall(Tabs);
export default STabs;
