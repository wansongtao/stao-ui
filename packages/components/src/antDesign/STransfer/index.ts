import BaseTransfer from './index.vue';
import type { ITransferItem, ItemType } from './index.vue';
import { withInstall } from '@stao-ui/utils';

export type { ITransferItem, ItemType };
export type BaseTransferInstance = InstanceType<typeof BaseTransfer>;
export const STransfer = withInstall(BaseTransfer);
export default STransfer;
