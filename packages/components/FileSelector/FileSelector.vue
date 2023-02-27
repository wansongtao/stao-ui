<script lang="ts" setup>
import { ref, watch } from 'vue';
import messageNotice from '@stao-ui/utils/messageNotice';

const props = defineProps({
  /**
   * 是否启用上传目录功能，优先级最高（设置为true后，accept、limit、drag将不生效）
   */
  webkitdirectory: {
    type: Boolean,
    default: false
  },
  /**
   * @description 唯一文件类型说明符，请参考w3c
   */
  accept: {
    type: String,
    default: ''
  },
  /**
   * @description 允许选择的文件个数
   */
  limit: {
    type: Number,
    validator(value: number) {
      return value > 0 && Number.isInteger(value);
    }
  },
  /**
   * @description 是否启用拖拽获取文件
   */
  drag: {
    type: Boolean,
    default: false
  },
  /**
   * @description 超出限制的文件数时，是否允许继续选择文件并替换旧文件
   */
  excessReplace: {
    type: Boolean,
    default: false
  },
  /**
   * @description 单个文件最大字节
   */
  size: {
    type: Number,
    validator(value: number) {
      return value > 0;
    }
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits<{ (event: 'changeFile', files: File[]): void }>();

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
watch(() => props.disabled, (value) => {
  disabled.value = value;
});

const fileEle = ref<HTMLInputElement | null>(null);

const onOpenFileDialog = () => {
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

  if (props.size) {
    const isVerify = checkedFiles.every((value) =>
      verifyFile(value, props.size)
    );

    if (!isVerify) {
      messageNotice({
        content: '文件过大，请重新选择',
        type: 'warning'
      })
      return;
    }
  }

  const plot = {
    singleFile: () => {
      if (!props.excessReplace) {
        disabled.value = true;
      }

      files.value = checkedFiles;
      emit('changeFile', files.value);
    },
    multipleFile: () => {
      // 多选未限制个数
      if (props.limit === Infinity) {
        files.value.push(...checkedFiles);
        emit('changeFile', files.value);
        return;
      }

      // 多选，限制了个数
      const total = files.value.length + checkedFiles.length;
      if (total >= (props.limit as number) && !props.excessReplace) {
        disabled.value = true;
      }

      const newFiles = [...files.value, ...checkedFiles];
      // 移除多余的文件
      if (props.excessReplace) {
        const len = newFiles.length;
        newFiles.splice(0, len - (props.limit as number));
      } else {
        newFiles.splice(props.limit as number);
      }

      files.value = newFiles;
      emit('changeFile', files.value);
    },
    folder: () => {
      disabled.value = true;
      files.value = checkedFiles;
      emit('changeFile', files.value);
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

const onSelectFile = (e: Event) => {
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
  onOpenFileDialog,
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
    @change="onSelectFile" />
  <div
    class="file_btn"
    :class="disabled ? 'file_btn--stop' : ''"
    @click="onOpenFileDialog"
    v-if="!drag || webkitdirectory">
    <slot :disabled="disabled">
      <div class="default_btn">选择文件</div>
    </slot>
  </div>
  <div
    class="file_btn"
    :class="disabled ? 'file_btn--stop' : ''"
    @click="onOpenFileDialog"
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
