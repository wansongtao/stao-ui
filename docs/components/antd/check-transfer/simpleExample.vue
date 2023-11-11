<script lang="ts" setup>
import { STransfer, type ITransferItem } from '@stao-ui/components';

const staticList: ITransferItem[] = [
  {
    id: 1,
    name: '水果',
    checkAll: false,
    list: [
      {
        id: 10,
        name: '香蕉'
      },
      {
        id: 11,
        name: '苹果'
      },
      {
        id: 12,
        name: '桔子'
      },
      {
        id: 13,
        name: '葡萄'
      },
      {
        id: 14,
        name: '柚子'
      },
      {
        id: 15,
        name: '冬枣'
      }
    ],
    checkedValues: []
  },
  {
    id: 2,
    name: '蔬菜',
    checkAll: false,
    list: [
      {
        id: 20,
        name: '白菜'
      },
      {
        id: 21,
        name: '青瓜'
      },
      {
        id: 22,
        name: '韭菜'
      },
      {
        id: 23,
        name: '包菜'
      },
      {
        id: 24,
        name: '甜菜'
      },
      {
        id: 25,
        name: '萝卜'
      }
    ],
    checkedValues: []
  },
  {
    id: 3,
    name: '肉类',
    checkAll: false,
    list: [
      {
        id: 30,
        name: '猪肉'
      },
      {
        id: 31,
        name: '牛肉'
      },
      {
        id: 32,
        name: '羊肉'
      },
      {
        id: 33,
        name: '鸡肉'
      },
      {
        id: 34,
        name: '鸭肉'
      },
      {
        id: 35,
        name: '鹅肉'
      }
    ],
    checkedValues: []
  }
]

const requestFn = (): Promise<ITransferItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(staticList)
    }, 400)
  })
}
</script>

<template>
  <div>
    <STransfer :requestFn="requestFn" />
  </div>
</template>

<style lang="scss" scoped>

</style>