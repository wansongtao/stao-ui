<script lang="ts" setup>
import { SAntBaseSwitch } from '@stao-ui/components'
import { ref } from 'vue'

defineOptions({
  name: 'ASwitchExample'
})

const checked = ref(false)
const data = ref({
  index: 1
})

const onChange = (value: {
  checked: boolean | number | string
  data: { index: number }
  e: Event
}) => {
  console.log('onChange', value, value.data.index)
}
</script>

<template>
  <div class="switch-example">
    <s-ant-base-switch
      v-model:checked="checked"
      checked-children="开"
      un-checked-children="关"
      :data="data"
      @change="onChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.switch-example {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  height: 100%;
}
</style>
