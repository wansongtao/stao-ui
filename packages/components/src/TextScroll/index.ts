import TextScroll from './index.vue';
import { withInstall } from '@stao-ui/utils';

export type TextScrollInstance = InstanceType<typeof TextScroll>;
export const STextScroll = withInstall(TextScroll);
export default STextScroll;
