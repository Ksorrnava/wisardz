<template>
  <div class="header">
      <img src="../../static/logo.png">
      <div class="main-menu">
        <ul>
          <li><router-link :to="{path: '/' }">Courses</router-link></li>
          <li><router-link :to="{path: '/students' }">Students</router-link></li>
        </ul>
      </div>
  </div>
</template>


<style lang="scss">
.el-header {
  background: #2e303f;
  display: flex;
  align-items: center;
  .header {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .main-menu{
    flex: 1;
    text-align: right;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        display: inline-block;
        a {
          line-height: 60px;
          font-size: 16px;
          color: #f1f3f4;
          opacity: 0.5;
          display: block;
          &.router-link-exact-active,
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
