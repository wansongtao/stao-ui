<script lang="ts" setup>
import { vClickOutside } from "@utils/directives/vClickOutside";
import { ref } from "vue";

const count = ref(0);
const onClickOutside = () => {
  count.value++;
};
</script>

<template>
  <div class="container">
    <div class="child" v-click-outside="onClickOutside">Click outside me</div>
    <div>Click outside count: {{ count }}</div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 0 10px;
  height: 100px;
  border: 1px solid #999;

  .child {
    margin: 5px auto;
    height: 50px;
    width: 200px;
    background-color: #f0f0f0;
  }
}
</style>