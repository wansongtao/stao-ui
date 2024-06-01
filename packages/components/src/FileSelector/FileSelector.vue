<script lang="ts" setup>
import { ref, watch } from 'vue';

interface IFileSelectorProps {
  /**
   * 是否启用上传目录功能，优先级最高，默认false（设置为true后，accept、limit、drag将不生效）
   */
  webkitdirectory?: boolean;
  /**
   * @description 唯一文件类型说明符，请参考w3c。默认不限制文件类型。
   */
  accept?: string;
  /**
   * @description 允许选择的文件个数，默认1.
   */
  limit?: number;
  /**
   * @description 是否启用拖拽获取文件，默认false。
   */
  drag?: boolean;
  /**
   * @description 超出限制的文件数时，是否允许继续选择文件并替换旧文件。默认false。
   */
  excessReplace?: boolean;
  /**
   * @description 单个文件最大字节
   */
  size?: number;
  /**
   * @description 是否禁用选择，默认false。
   */
  disabled?: boolean;
}

const $props = withDefaults(defineProps<IFileSelectorProps>(), {
  webkitdirectory: false,
  accept: '',
  limit: 1,
  drag: false,
  excessReplace: false,
  disabled: false
});
const $emits = defineEmits<{
  'change': [files: File[]];
  'exceed-size': [files: File[]];
}>();

const disabled = ref(false || $props.disabled);
watch(
  () => $props.disabled,
  (value) => {
    disabled.value = value;
  }
);

const files = ref<File[]>([]);
const addFiles = (checkedFiles: File[]) => {
  if ($props.size && $props.size > 0) {
    const maxFiles = checkedFiles.filter((value) => {
      return value.size > $props.size!;
    });

    if (maxFiles.length) {
      $emits('exceed-size', maxFiles);

      checkedFiles = checkedFiles.filter((value) => {
        return value.size <= $props.size!;
      });
    }
  }

  if (!checkedFiles.length) {
    return;
  }

  const strategies = {
    singleFile: () => {
      if (!$props.excessReplace) {
        disabled.value = true;
      }

      files.value = checkedFiles;
      $emits('change', files.value);
    },
    multipleFile: () => {
      // 多选未限制个数
      if ($props.limit === Infinity) {
        files.value.push(...checkedFiles);
        $emits('change', files.value);
        return;
      }

      // 多选，限制了个数
      const total = files.value.length + checkedFiles.length;
      if (total >= $props.limit && !$props.excessReplace) {
        disabled.value = true;
      }

      const allFiles = [...files.value, ...checkedFiles];
      if ($props.excessReplace) {
        allFiles.splice(0, total - $props.limit);
      } else {
        allFiles.splice($props.limit);
      }

      files.value = allFiles;
      $emits('change', files.value);
    },
    folder: () => {
      disabled.value = true;
      files.value = checkedFiles;
      $emits('change', files.value);
    }
  };

  if ($props.webkitdirectory) {
    strategies.folder();
    return;
  }

  if (!$props.limit || $props.limit === 1) {
    strategies.singleFile();
    return;
  }

  strategies.multipleFile();
};

const inputElement = ref<HTMLInputElement | null>(null);
const onOpenFolder = () => {
  if (!inputElement.value || disabled.value) {
    return;
  }

  inputElement.value.click();
};
const clearFiles = () => {
  disabled.value = false;
  files.value = [];

  // 解决删除文件后，再上传相同文件失败的错误
  (inputElement.value as HTMLInputElement).value = '';
};
const deleteFile = (index: number) => {
  if (!Number.isInteger(index) || index >= files.value.length) {
    return;
  }

  if (files.value.length === 1) {
    clearFiles();
    return;
  }

  if (disabled.value) {
    disabled.value = false;
  }
  files.value.splice(index, 1);
};
const onChangeFile = (e: Event) => {
  const checkedFiles = (e.target as HTMLInputElement).files;
  if (!checkedFiles) {
    return;
  }
  addFiles(Array.from(checkedFiles));
};
const onDragFile = (e: DragEvent) => {
  const checkedFiles = e.dataTransfer?.files;
  if (!checkedFiles) {
    return;
  }
  addFiles(Array.from(checkedFiles));
};

defineExpose({
  onOpenFolder,
  deleteFile,
  clearFiles
});
</script>

<template>
  <input
    ref="inputElement"
    type="file"
    name="files"
    title="upload"
    :webkitdirectory="webkitdirectory"
    :multiple="limit !== undefined && limit > 1"
    :accept="accept"
    class="file_input"
    @change="onChangeFile" />
  <div
    class="file_btn"
    :class="disabled ? 'file_btn--stop' : ''"
    @click="onOpenFolder"
    v-if="!drag || webkitdirectory">
    <slot :disabled="disabled">
      <div class="default_btn">选择文件</div>
    </slot>
  </div>
  <div
    class="file_btn"
    :class="disabled ? 'file_btn--stop' : ''"
    @click="onOpenFolder"
    @dragenter.prevent
    @dragover.prevent
    @drop.prevent="onDragFile"
    v-if="drag && !webkitdirectory">
    <slot :disabled="disabled">
      <div class="default_btn">选择文件</div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.file_input {
  display: none !important;
}
.file_btn {
  display: inline-block;
  cursor: pointer;
}
.file_btn--stop:hover {
  cursor: not-allowed;
}

.default_btn {
  width: 80px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border: 1px solid #999;
}
</style>
