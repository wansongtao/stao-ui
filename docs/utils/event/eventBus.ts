import { EventBus } from "@stao-ui/utils";

export default new EventBus<{
  changeState(data: number): void;
}>();
