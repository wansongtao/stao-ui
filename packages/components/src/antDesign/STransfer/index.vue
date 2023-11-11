<script lang="ts" setup>
import {
  Checkbox as ACheckbox,
  CheckboxGroup as ACheckboxGroup,
  Row as ARow,
  Col as ACol,
  Spin as ASpin,
  Empty as AEmpty
} from 'ant-design-vue'
import type { CheckboxChangeEvent } from 'ant-design-vue/es/checkbox/interface'
import 'ant-design-vue/es/checkbox/style/css'
import 'ant-design-vue/es/row/style/css'
import 'ant-design-vue/es/col/style/css'
import 'ant-design-vue/es/spin/style/css'
import 'ant-design-vue/es/empty/style/css'
import { ref, watch } from 'vue'

export interface ItemType {
  id: number
  name: string
}

export interface ITransferItem extends ItemType {
  checkAll: boolean
  list: ItemType[]
  checkedValues: number[]
}

defineOptions({
  name: 'BaseTransfer'
})

const $props = withDefaults(
  defineProps<{
    requestFn: () => Promise<ITransferItem[]>
    colSpan?: number
  }>(),
  {
    colSpan: 6
  }
)
const $emits = defineEmits<{ (e: 'changeCheck', value: number[]): void }>()

const list = ref<ITransferItem[]>([])
const loading = ref(false)
const requestList = () => {
  loading.value = true

  $props.requestFn().then((res) => {
    list.value = res
    loading.value = false
  })
}
requestList()

const checkAll = ref(false)
const setCheckAllState = () => {
  const noCheckAll = list.value.some((v) => !v.checkAll)
  if (noCheckAll) {
    checkAll.value = false
    return
  }

  checkAll.value = true
}

const onCheckAllChange = (_e: CheckboxChangeEvent, index?: number) => {
  if (index === undefined) {
    if (checkAll.value) {
      list.value.forEach((item) => {
        item.checkAll = true
        item.checkedValues = item.list.map((v) => v.id)
      })
    } else {
      list.value.forEach((item) => {
        item.checkAll = false
        item.checkedValues = []
      })
    }
    return
  }

  const groupItem = list.value[index]
  if (groupItem.checkAll) {
    groupItem.checkedValues = groupItem.list.map((v) => v.id)
    setCheckAllState()
    return
  }

  groupItem.checkedValues = []
  checkAll.value = false
}

const onCheckChange = (index: number) => {
  const item = list.value[index]
  if (item.checkedValues.length === item.list.length) {
    item.checkAll = true
  } else {
    item.checkAll = false
  }

  setCheckAllState()
}

const allCheckedIds: number[] = []
const allCheckedItems = ref<ItemType[]>([])

watch(allCheckedItems, () => {
  $emits('changeCheck', allCheckedIds)
}, { deep: true })

let isRemove = false
const onRemove = (index: number) => {
  isRemove = true
  setTimeout(() => {
    isRemove = false
  }, 0)
  checkAll.value = false

  // 修改左边可选项的选中状态
  const item = allCheckedItems.value[index]
  const id = item.id
  list.value.forEach((v) => {
    const idx = v.checkedValues.indexOf(id)
    if (idx !== -1) {
      v.checkedValues.splice(idx, 1)
      v.checkAll = false
    }
  })

  // 移除右边已选项
  allCheckedItems.value.splice(index, 1)
  allCheckedIds.splice(allCheckedIds.indexOf(id), 1)
}

watch(
  list,
  () => {
    if (isRemove) {
      return
    }

    const ids = list.value.reduce((prev, cur) => {
      prev.push(...cur.checkedValues)
      return prev
    }, [] as number[])

    allCheckedIds.splice(0, allCheckedIds.length, ...ids)

    allCheckedItems.value = []
    list.value.forEach((item) => {
      item.list.forEach((v) => {
        if (ids.includes(v.id)) {
          allCheckedItems.value.push(v)
        }
      })
    })
  },
  { deep: true }
)
</script>

<template>
  <div class="transfer">
    <div class="transfer_left">
      <div class="transfer_head">可选项</div>
      <div class="transfer-box transfer--bordered">
        <div v-if="loading || !list.length" class="box_center">
          <a-spin v-if="loading" size="large" />
          <a-empty v-else-if="!list.length" description="暂无数据" />
        </div>
        <template v-if="!loading && list.length">
          <div class="transfer_left_top">
            <a-checkbox
              v-model:checked="checkAll"
              :indeterminate="!checkAll"
              @change="onCheckAllChange"
            >
              <span class="text--primary">全选</span>
            </a-checkbox>
          </div>
          <div class="transfer_left_main">
            <template v-for="(item, index) in list" :key="item.id">
              <div class="mtb-8">
                <a-checkbox
                  v-model:checked="item.checkAll"
                  :indeterminate="!item.checkAll"
                  @change="onCheckAllChange($event, index)"
                >
                  <span class="text--primary group_name">{{ item.name }}</span>
                </a-checkbox>
              </div>
              <a-checkbox-group
                v-model:value="item.checkedValues"
                @change="onCheckChange(index)"
                style="width: 100%"
              >
                <a-row>
                  <a-col
                    style="margin-bottom: 5px"
                    :span="colSpan"
                    v-for="val in item.list"
                    :key="val.id"
                  >
                    <a-checkbox :value="val.id">
                      <slot :value="val">
                        {{ val.name }}
                      </slot>
                    </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
            </template>
          </div>
        </template>
      </div>
    </div>
    <div class="transfer_right">
      <div class="transfer_head flexbox">
        已选项<span class="dot" /><span class="text--primary">{{ allCheckedItems.length }}</span>
      </div>
      <div class="transfer-box transfer--bordered" style="overflow-y: auto">
        <template v-if="allCheckedItems.length">
          <div class="transfer_item" v-for="(item, index) in allCheckedItems" :key="item.id">
            <span
              ><slot name="checked" :value="item">{{ item.name }}</slot></span
            >
            <span class="icon--close" @click="onRemove(index)">
              <slot name="delete"> X </slot>
            </span>
          </div>
        </template>
        <div v-else class="box_center">
          <a-empty description="暂无选中" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.transfer {
  display: flex;
  justify-content: space-between;

  .transfer_left {
    flex: 1;
  }

  .transfer_right {
    flex-shrink: 0;
    margin-left: 16px;
    width: 200px;
  }

  .transfer--bordered {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
  }

  .transfer-box {
    position: relative;
    margin-top: 8px;
    padding: 16px;
    box-sizing: border-box;
    height: 300px;
  }

  .transfer_head {
    height: 20px;
    font-size: 12px;
    color: #737e97;
    line-height: 20px;
  }
}

.box_center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.flexbox {
  display: flex;
  align-items: center;
}

.flexcolumn {
  display: flex;
  flex-direction: column;
}

.dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #737e97;
  margin: 0 4px;
}

.transfer_left_top {
  flex-shrink: 0;
  height: 30px;
}

.transfer_left_main {
  padding-bottom: 16px;
  box-sizing: border-box;
  height: calc(100% - 14px);
  overflow-y: auto;
}

.mtb-8 {
  margin: 8px 0;
}

.text--primary {
  color: #2361ff;
}

.transfer_item {
  margin-bottom: 4px;
  padding: 0 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;

  .icon--close {
    display: none;
    padding: 4px;
    color: #737e97;
    cursor: pointer;
  }

  &:hover {
    background-color: #f5f7fa;
    border-radius: 4px;
    color: #2361ff;
  }

  &:hover .icon--close {
    display: block;
  }
}
</style>
