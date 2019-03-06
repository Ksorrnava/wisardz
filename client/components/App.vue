<template>
<div id="app">
  <el-container>
    <el-header>
      <headerMain />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</div>
</template>

<script>
import headerMain from 'components/headerMain';

export default {
  components: {
    headerMain,
  },
  beforeCreate() {
    this.$store.commit('INIT_STORE');
  },
}
</script>

<style lang="scss">
body {
    margin: 0;
    font-size: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, helvetica, 'helvetica neue', Ubuntu, 'segoe ui', arial, sans-serif;
}
h1 {
  margin: 0;
  font-size: 36px;
  text-align: center;
}
a {
    text-decoration: none;
}
.success {
    color: #67C23A;
}
.danger {
    color: #F56C6C;
}
</style>
