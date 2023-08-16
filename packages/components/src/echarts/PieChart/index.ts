import PieChart from './index.vue';
import { withInstall } from '@stao-ui/utils';

export type PieChartInstance = InstanceType<typeof PieChart>;
export const SPieChart = withInstall(PieChart);
export default SPieChart;
