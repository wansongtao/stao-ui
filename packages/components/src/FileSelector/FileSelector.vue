<script lang="ts" setup>
import { ref, watch } from 'vue';

export interface IFileSelectorProps {
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

const props = withDefaults(defineProps<IFileSelectorProps>(), {
  webkitdirectory: false,
  accept: '',
  limit: 1,
  drag: false,
  excessReplace: false,
  disabled: false
});
const emits = defineEmits<{
  (e: 'changeFile', files: File[]): void;
  /**
   * @description 抛出超出大小的文件列表
   */
  (e: 'overSize', overFiles: File[]): void;
}>();

const verifyFile = (file: File, size?: number, type?: string) => {
  if (size) {
    if (file.size > size) {
      return false;
    }
  }

  if (type) {
    if (file.type !== type) {
      return false;
    }
  }

  return true;
};

const disabled = ref(false || props.disabled);
watch(
  () => props.disabled,
  (value) => {
    disabled.value = value;
  }
);

const fileEle = ref<HTMLInputElement | null>(null);

/**
 * @description 打开选择文件弹窗
 */
const onSelectFile = () => {
  if (!fileEle.value) {
    return;
  }

  if (disabled.value) {
    return;
  }

  fileEle.value.click();
};

const files = ref<File[]>([]);
const saveFileInfo = (checkedFiles: File[]) => {
  if (!checkedFiles.length) {
    return;
  }

  if (props.size && props.size > 0) {
    const overFiles = checkedFiles.filter((value) =>
      !verifyFile(value, props.size)
    );

    if (overFiles.length) {
      emits('overSize', overFiles);
      return;
    }
  }

  const plot = {
    singleFile: () => {
      if (!props.excessReplace) {
        disabled.value = true;
      }

      files.value = checkedFiles;
      emits('changeFile', files.value);
    },
    multipleFile: () => {
      // 多选未限制个数
      if (props.limit === Infinity) {
        files.value.push(...checkedFiles);
        emits('changeFile', files.value);
        return;
      }

      // 多选，限制了个数
      const total = files.value.length + checkedFiles.length;
      if (total >= props.limit && !props.excessReplace) {
        disabled.value = true;
      }

      const newFiles = [...files.value, ...checkedFiles];
      // 移除多余的文件
      if (props.excessReplace) {
        const len = newFiles.length;
        newFiles.splice(0, len - props.limit);
      } else {
        newFiles.splice(props.limit);
      }

      files.value = newFiles;
      emits('changeFile', files.value);
    },
    folder: () => {
      disabled.value = true;
      files.value = checkedFiles;
      emits('changeFile', files.value);
    }
  };

  // 读取文件夹下所有文件
  if (props.webkitdirectory) {
    plot.folder();
    return;
  }

  // 单选
  if (!props.limit || props.limit === 1) {
    plot.singleFile();
    return;
  }

  plot.multipleFile();
};

const deleteFile = (idx: number) => {
  if (!Number.isInteger(idx) || idx >= files.value.length) {
    return;
  }

  files.value.splice(idx, 1);

  if (disabled.value) {
    disabled.value = false;
  }
  if (!files.value.length) {
    // 解决删除文件后，再上传相同文件失败的错误
    (fileEle.value as HTMLInputElement).value = '';
  }
};

const clearFiles = () => {
  disabled.value = false;
  files.value = [];

  // 解决删除文件后，再上传相同文件失败的错误
  (fileEle.value as HTMLInputElement).value = '';
};

const onChangeFile = (e: Event) => {
  const checkedFiles = (e.target as HTMLInputElement).files;
  if (!checkedFiles) {
    return;
  }

  saveFileInfo(Array.from(checkedFiles));
};
const onDragFile = (e: DragEvent) => {
  const checkedFiles = e.dataTransfer!.files;
  saveFileInfo(Array.from(checkedFiles));
};

defineExpose({
  onSelectFile,
  deleteFile,
  clearFiles,
  verifyFile
});
</script>

<template>
  <input
    ref="fileEle"
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
    @click="onSelectFile"
    v-if="!drag || webkitdirectory">
    <slot :disabled="disabled">
      <div class="default_btn">选择文件</div>
    </slot>
  </div>
  <div
    class="file_btn"
    :class="disabled ? 'file_btn--stop' : ''"
    @click="onSelectFile"
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
