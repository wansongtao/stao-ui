import Loader from './BaseLoader.vue';
import { withInstall } from '@stao-ui/utils';

export type LoaderInstance = InstanceType<typeof Loader>;
export const BaseLoader = withInstall(Loader);
export default BaseLoader;
