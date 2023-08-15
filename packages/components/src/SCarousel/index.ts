import carousel from './index.vue';
import { withInstall } from '@stao-ui/utils';

export type SCarouselInstance = InstanceType<typeof carousel>;
export const SCarousel = withInstall(carousel);
export default SCarousel;
