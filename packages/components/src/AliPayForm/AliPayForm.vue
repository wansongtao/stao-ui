<script lang="ts" setup>
import { ref, watch } from 'vue';

const $props = defineProps<{
  formHtml?: string;
}>();
const $emits = defineEmits<{
  (e: 'handleLoaded', loaded: boolean): void;
}>();

const iframeName = 'alipay';
const aliPayRef = ref<HTMLElement>();
const iframeRef = ref<HTMLIFrameElement>();

watch(
  () => $props.formHtml,
  (val) => {
    if (!val || !aliPayRef.value) return;

    aliPayRef.value.innerHTML = val;
    const form = aliPayRef.value.children[0] as HTMLFormElement;
    form.target = iframeName;
    form.submit();

    iframeRef.value!.onload = () => {
      $emits('handleLoaded', true);
    };
  },
  { immediate: true }
);
</script>

<template>
  <div ref="aliPayRef" class="box" />
  <iframe
    v-show="formHtml"
    v-bind="$attrs"
    ref="iframeRef"
    class="alipay-iframe"
    frameborder="0"
    :name="iframeName" />
</template>

<style lang="scss" scoped>
.box {
  width: 0;
  height: 0;
}
.alipay-iframe {
  margin: 0 auto;
  width: 100%;
}
</style>
