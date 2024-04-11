# CSS

记录一些 CSS 代码片段。

## 自定义input光标颜色

<input type="text" class="caret-color" />

<style scoped>
input {
  width: 200px;
  height: 30px;
  font-size: 16px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.caret-color {
  caret-color: red;
}
</style>
  
```css
.caret-color {
  caret-color: #ca6e31;
}
```

## 移除input尾部箭头

```css
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
```

## 自定义滚动条样式

<div class="scrollbar">
  <div class="scrollbar-content">
    <div class="scrollbar-item">1</div>
    <div class="scrollbar-item">2</div>
    <div class="scrollbar-item">3</div>
    <div class="scrollbar-item">4</div>
    <div class="scrollbar-item">5</div>
    <div class="scrollbar-item">6</div>
    <div class="scrollbar-item">7</div>
    <div class="scrollbar-item">8</div>
    <div class="scrollbar-item">9</div>
    <div class="scrollbar-item">10</div>
    <div class="scrollbar-item">11</div>
    <div class="scrollbar-item">12</div>
    <div class="scrollbar-item">13</div>
    <div class="scrollbar-item">14</div>
    <div class="scrollbar-item">15</div>
    <div class="scrollbar-item">16</div>
    <div class="scrollbar-item">17</div>
    <div class="scrollbar-item">18</div>
    <div class="scrollbar-item">19</div>
    <div class="scrollbar-item">20</div>
  </div>
</div>

<style scoped>
.scrollbar {
  width: 200px;
  height: 200px;
  overflow: auto;
  border: 1px solid #ccc;
}
.scrollbar-content {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.scrollbar-item {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}
.scrollbar::-webkit-scrollbar-track {
  background-color: #eee;
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
}
</style>
  
```css
.scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}
.scrollbar::-webkit-scrollbar-track {
  background-color: #eee;
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
}

/* 隐藏滚动条 */
.box-hide-scrollbar::-webkit-scrollbar {
  display: none;
}
```

## 选中文本样式

<div class="select-text">选中文本</div>

<style scoped>
.select-text {
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #ccc;
}
.select-text::selection {
  background-color: #ca6e31;
  color: #fff;
}
</style>
  
```css
.select-text::selection {
  background-color: #ca6e31;
  color: #fff;

  /* user-select: none; 禁止选中 */
}
```

## 文本溢出显示省略号

```css
/* 超出一行 */
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}

/* 超出两行 */
.ellipsis-multi {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

## 刘海屏底部适配

```css
/* ios系统：保证滚动丝滑 */
.scroll--ios {
  -webkit-overflow-scrolling: touch;
}

/* 刘海屏底部适配 */
@media screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .safe-area--btm {
    box-sizing: content-box;
    padding-bottom: 34px;
  }
}

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  .safe-area--btm {
    box-sizing: content-box;
    padding-bottom: 34px;
  }
}

@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2) {
  .safe-area--btm {
    box-sizing: content-box;
    padding-bottom: 34px;
  }
}

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  .safe-area--btm {
    box-sizing: content-box;
    padding-bottom: 34px;
  }
}
```

## 1px方案

```css
/* 1px方案 */
.border--1px:before {
  content: '';
  position: absolute;
  top: 0;
  height: 1px;
  width: 100%;
  background-color: #000;
  transform-origin: 0% 0%;
}

@media only screen and (-webkit-min-device-pixel-ratio:2) {
  .border--1px:before {
    transform: scaleY(0.5);
  }
}

@media only screen and (-webkit-min-device-pixel-ratio:3) {
  .border--1px:before {
    transform: scaleY(0.33);
  }
}
```

