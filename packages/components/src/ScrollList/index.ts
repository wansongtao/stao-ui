import ScrollListVue from "./ScrollList.vue";
import { withInstall } from '@stao-ui/utils';

export type ScrollListInstance = InstanceType<typeof ScrollListVue>;
export const ScrollList = withInstall(ScrollListVue);
export default ScrollList;
