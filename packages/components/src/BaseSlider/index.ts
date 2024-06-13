import Slider from './BaseSlider.vue'
import { withInstall } from '@stao-ui/utils';

export type SliderInstance = InstanceType<typeof Slider>;
export const BaseSlider = withInstall(Slider);
export default BaseSlider;
