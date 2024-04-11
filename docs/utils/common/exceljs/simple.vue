<script lang="ts" setup>
import { STaoButton } from '@stao-ui/components';
import { createExcelFile, downloadFile, type IConfig } from '@stao-ui/utils';

const onDownloadSimple = () => {
  const config = {
    fields: ['name', 'age', 'phone', 'address'],
    merges: [{ row: 1, col: 1, rowspan: 0, colspan: 3 }],
    data: [
      { name: '张三', age: 18, phone: '12345678901', address: '北京市' },
      { name: '李四', age: 20, phone: '12345678901', address: '上海市' },
      { name: '王五', age: 22, phone: '12345678901', address: '广州市' },
      { name: '赵六', age: 24, phone: '12345678901', address: '深圳市' }
    ],
    headers: [['用户信息表'], ['姓名', '年龄', '电话', '地址']],
    sheetName: '用户信息表',
    columnsWidth: Array.from({ length: 4 }, () => 30)
  };

  createExcelFile(config).then((buffer) => {
    downloadFile(buffer, '用户信息表.xlsx');
  });
};
const onDownloadMulti = () => {
  const fields = [
    'name',
    'age',
    'phone',
    'address',
    'sex',
    'birthday',
    'email'
  ];
  const config: IConfig = {
    fields,
    data: [
      {
        name: '张三',
        age: 18,
        phone: '12345678901',
        address: '北京市',
        sex: '男',
        birthday: new Date('2000/01/01'),
        email: '无'
      },
      {
        name: '李四',
        age: 20,
        phone: '12345678901',
        address: '上海市',
        sex: '男',
        birthday: new Date('2000/01/02'),
        email: '无'
      },
      {
        name: '王五',
        age: 22,
        phone: '12345678901',
        address: '广州市',
        sex: '男',
        birthday: new Date('2000/01/03'),
        email: '无'
      },
      {
        name: '赵六',
        age: 24,
        phone: '12345678901',
        address: '深圳市',
        sex: '男',
        birthday: new Date('2000/01/04'),
        email: '无'
      }
    ],
    attrs: [],
    headers: [
      ['用户信息表'],
      ['姓名', '其他信息'],
      ['', '年龄', '电话', '地址', '性别', '生日', '邮箱']
    ],
    merges: [
      { row: 1, col: 1, rowspan: 0, colspan: fields.length - 1 }, // 显示标题 '用户信息表'
      { row: 2, col: 1, rowspan: 1, colspan: 0 }, // 显示表头 '姓名'
      { row: 2, col: 2, rowspan: 0, colspan: 5 } // 显示表头 '其他信息'
    ],
    sheetName: '用户信息表-复杂表头',
    columnsWidth: Array.from({ length: fields.length }, () => 20)
  };

  config?.fields?.forEach((item, index) => {
    if (item === 'age') {
      // 设置整数格式
      config?.attrs?.push({
        rowStart: 4,
        rowEnd: config.data.length + 3,
        colStart: index + 1,
        colEnd: index + 1,
        attr: {
          numFmt: '#,##0'
        }
      });
      return;
    }

    if (item === 'birthday') {
      // 设置日期格式
      config?.attrs?.push({
        rowStart: 4,
        rowEnd: config.data.length + 3,
        colStart: index + 1,
        colEnd: index + 1,
        attr: {
          numFmt: 'yyyy"年"mm"月"dd"日"'
        }
      });
      return;
    }
  });

  // 设置单元格样式
  config?.attrs?.push({
    rowStart: 1,
    rowEnd: config.data.length + 3,
    colStart: 1,
    colEnd: config?.fields?.length,
    attr: {
      alignment: { vertical: 'middle', horizontal: 'center' },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    }
  });

  // 设置表头标题样式
  config?.attrs?.push({
    rowStart: 1,
    rowEnd: 1,
    colStart: 1,
    colEnd: config?.fields?.length,
    attr: {
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'e2efda' }
      },
      font: {
        size: 20,
        bold: true
      }
    }
  });

  // 设置表头填充颜色，字体加粗
  config?.attrs?.push({
    rowStart: 2,
    rowEnd: 3,
    colStart: 1,
    colEnd: config?.fields?.length,
    attr: {
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'c6e0b4' }
      },
      font: {
        bold: true
      }
    }
  });

  createExcelFile(config).then((buffer) => {
    downloadFile(buffer, '用户信息表-复杂表头.xlsx');
  });
};
</script>

<template>
  <STaoButton type="line" @click="onDownloadSimple">生成简单excel</STaoButton>
  <div class="img">
    <img src="./excel1.png" alt="">
  </div>
  <STaoButton style="margin-top: 30px" @click="onDownloadMulti"
    >生成复杂excel</STaoButton
  >
  <div class="img">
    <img src="./excel2.png" alt="">
  </div>
</template>

<style lang="scss" scoped>
.img {
  margin-top: 30px;
  img {
    width: 100%;
  }
}
</style>
