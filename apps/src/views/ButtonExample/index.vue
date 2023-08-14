<script lang="ts" setup>
import { ref } from 'vue'
import { STaoButton } from '@stao-ui/components'
import IconDocumentation from '@/components/icons/IconDocumentation.vue'

defineOptions({
  name: 'ButtonExample'
})

const disabled = ref(false)
const onClick = () => {
  disabled.value = !disabled.value
}
</script>

<template>
  <div class="container">
    <STaoButton type="line" :disabled="disabled" @click="onClick">
      <span style="margin-right: 6px; display: flex; align-item: center">
        <IconDocumentation />
      </span>
      按钮
    </STaoButton>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 20px;
  width: 200px;
}
</style>
