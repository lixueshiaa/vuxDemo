<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { creatVueExp } from '@/services/axios/axios'
export default {
  name: 'app',
  created () {
    creatVueExp(this)
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
