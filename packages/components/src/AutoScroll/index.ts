import AutoScrollVue from "./AutoScroll.vue";
import { withInstall } from '@stao-ui/utils';

export type AutoScrollInstance = InstanceType<typeof AutoScrollVue>;
export const AutoScroll = withInstall(AutoScrollVue);
export default AutoScroll;
