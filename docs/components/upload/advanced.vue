<script lang="ts" setup>
import { ref } from 'vue';
import { STaoFileSelector as FileSelector } from '@stao-ui/components';

defineProps<{
  url?: string;
  disabled?: boolean;
}>();

const emits = defineEmits<{
  changeImage: [file: File];
}>();

const fileUrl = ref(
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
);
const fileImg = ref<File | null>(null);
const onGetFile = (files: File[]) => {
  const file = files[0];
  if (!file) {
    return;
  }

  fileImg.value = file;
  emits('changeImage', file);
  fileUrl.value = (window.URL || window.webkitURL).createObjectURL(file);
};
const onUploadFileImg = () => {
  return new Promise<string>((resolve, reject) => {
    if (!fileImg.value) {
      reject();
      return;
    }

    resolve(fileUrl.value);
    // uploadFile(fileImg.value)
    //   .then((res) => {
    //     resolve(res.data);

    //     fileUrl.value = '';
    //     fileImg.value = null;
    //   })
    //   .catch(() => {
    //     reject();
    //   });
  });
};

defineExpose({
  onUploadFileImg
});
</script>

<template>
  <div class="avatar_upload">
    <FileSelector
      accept="image/png,image/jpeg,image/jpg"
      :limit="1"
      :size="2 * 1024 * 1024"
      :excess-replace="true"
      :disabled="disabled"
      @change-file="onGetFile">
      <div class="upload_box flex_center">
        <div class="upload_box_main" v-if="fileUrl || url">
          <img :src="fileUrl || url" alt="" class="avatar" />
          <div class="avatar modal flex_center">
            <img src="./update.png" alt="" class="upload_icon" />
          </div>
        </div>
        <img src="./update.png" alt="" class="upload_icon" v-else />
      </div>
    </FileSelector>
  </div>
</template>

<style lang="scss" scoped>
@mixin box {
  width: 100px;
  height: 100px;
  border-radius: 2px;
}

.flex_center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar_upload {
  @include box;

  .upload_box {
    position: relative;
    @include box;
    background: #edf1fa;
    border: 1px dotted #d9d9d9;

    .upload_box_main {
      position: relative;
    }
  }

  .modal {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #d9d9d9;
  }

  .upload_box_main:hover .modal {
    display: flex;
  }

  .avatar {
    width: 90px;
    height: 90px;
    border-radius: 4px;
  }

  .upload_icon {
    width: 24px;
  }
}
</style>
