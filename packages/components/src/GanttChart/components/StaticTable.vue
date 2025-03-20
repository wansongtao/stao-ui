<script lang="ts" setup>
defineProps<{
  tableWidth: number;
  cellWidth: number;
  lines: number;
  cells: number;
  lineHeight: number;
}>();
</script>

<template>
  <table
    class="static-table"
    border-spacing="0"
    cellspacing="0"
    :style="`width: ${tableWidth}px; overflow: hidden;`"
  >
    <tbody>
      <tr v-for="v in lines" :key="v">
        <td
          v-for="n in cells"
          :key="n"
          :style="`width: ${cellWidth}px; height: ${lineHeight}px`"
        ></td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.static-table {
  padding-bottom: 4px;
  transition: all 0.5s ease-in-out 0s;

  td {
    box-sizing: border-box;
    border-left: 1px solid #dfe1e4;
    border-top: 1px solid #dfe1e4;
  }

  td:first-child {
    border-left: none;
  }

  tr:nth-child(1) > td {
    border-top: none;
  }
}
</style>
