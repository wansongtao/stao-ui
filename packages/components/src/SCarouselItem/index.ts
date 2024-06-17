import CarouselItem from './index.vue';
import { withInstall } from '@stao-ui/utils';

export type BaseCarouselItemInstance = InstanceType<typeof CarouselItem>;
export const BaseCarouselItem = withInstall(CarouselItem);
export default BaseCarouselItem;
