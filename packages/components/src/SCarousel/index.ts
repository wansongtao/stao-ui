import Carousel from './index.vue';
import { withInstall } from '@stao-ui/utils';

export type BaseCarouselInstance = InstanceType<typeof Carousel>;
export const BaseCarousel = withInstall(Carousel);
export default BaseCarousel;
