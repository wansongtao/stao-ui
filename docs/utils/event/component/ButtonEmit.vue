<script lang="ts" setup>
import { ref } from 'vue'
import { STaoButton } from '@stao-ui/components'
import eventBus from '../eventBus'

const count = ref(1)
const onClick = () => {
  eventBus.$emit('changeState', count.value++)
}
</script>

<template>
  <div class="container">
    <STaoButton type="line" @click="onClick"> 发送事件 </STaoButton>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 200px;
}
</style>
