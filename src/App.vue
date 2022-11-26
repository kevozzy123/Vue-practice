<template>
  <div class="app-page">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../src/assets/fonts/iconfont.css";
@import '../node_modules/nprogress/nprogress.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body,
#app {
  background-color: var(--bg);
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  // --hue-color: 205;

  --first: #409eff;
  --success: #67c23a;
  --warning: #e6a23c;
  --danger: #f56c6c;
  --error: #f56c6c;
  --info: #909399;

  --bg: #dcdfe6;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.el-button--large {
  margin-left: 20px;
}


.iconfont {
  font-size: 2rem;
}

.page {
  // background-color: white;
  height: 100%;
}

.el-card{
  background-color: white;
  height: 100%;
}

.el-button--small{
  padding: 12px 15px !important;
}

.el-card__body {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.el-table{
  height: 100%;
  flex-grow: 1;
  color: black;
  margin-top: 1rem;
}

.input-box{
  display: flex;
  align-items: center;
}

.el-pagination {
  margin-top: 1rem;
}

.iconfont {
  font-size: 1.25rem;
  color: var(--info) !important;
  margin-right: .5rem;
}

#nprogress .bar {
  height: 6px;
}

#nprogress .spinner-icon{
  width: 30px;
  height: 30px;
  border: solid 5px transparent;
  border-top-color: #29d;
  border-left-color: #29d;
}
</style>
