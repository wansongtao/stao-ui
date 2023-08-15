import carouselItem from './index.vue';
import { withInstall } from '@stao-ui/utils';

export type SCarouselItemInstance = InstanceType<typeof carouselItem>;
export const SCarouselItem = withInstall(carouselItem);
export default SCarouselItem;
