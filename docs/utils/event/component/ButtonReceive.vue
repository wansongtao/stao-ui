<script lang="ts" setup>
import { ref } from 'vue'
import { STaoButton } from '@stao-ui/components'
import eventBus from '../eventBus'

const type = ref<'default' | 'line'>()
const num = ref(0)
const MAX = 10;

eventBus.$on('changeState', (count: number) => {
  if (count > MAX) {
    eventBus.$off('changeState')
  }

  type.value = count & 1 ? 'line' : 'default'
  num.value = count
})
</script>

<template>
  <div class="container">
    <STaoButton :type="type">接收事件 ( {{ num > MAX ? '已取消侦听' : num }} )</STaoButton>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 200px;
}
</style>
