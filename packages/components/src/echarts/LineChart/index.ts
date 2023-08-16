import LineChart from './index.vue';
import { withInstall } from '@stao-ui/utils';

export type LineChartInstance = InstanceType<typeof LineChart>;
export const SLineChart = withInstall(LineChart);
export default SLineChart;
