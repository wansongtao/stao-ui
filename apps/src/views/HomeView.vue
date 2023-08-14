<template>
  <div class="home-container">
    <template v-for="item in $router.options.routes" :key="item.name">
      <router-link :to="item.path" v-if="item.path !== '/'">
        {{ (item.meta && item.meta.title) || item.name }}
      </router-link>
    </template>
  </div>
</template>

<style lang="scss">
.home-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;

  a {
    display: block;
    margin-bottom: 10px;
    margin-right: 20px;
    padding: 10px;
    font-size: 14px;
    color: #000;
    border: 1px solid #999;
    text-decoration: none;
  }
}
</style>
