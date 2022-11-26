<template>
  <!-- <div class="common-layout"> -->
  <!-- <SideNavBar v-if="!$route.meta.showNav"></SideNavBar> -->
  <el-container>

    <el-aside :class=" isCollapse?'collapsed':'' ">
      <SideNavBar :navs="navs" :isCollapse="isCollapse"></SideNavBar>
    </el-aside>

    <el-container>

      <el-header>
        
        <div @click="isCollapse = !isCollapse">
          <el-icon v-show="!isCollapse"><Fold /></el-icon>
          <el-icon v-show="isCollapse"><Expand /></el-icon>
        </div>
       
        <el-dropdown>
          <div class="el-dropdown-link">
            <img src="../assets/imgs/bg.jpg" alt="">
            <span>欢迎: admin</span> 
            <el-icon>
              <arrow-down />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <el-main>
        <el-breadcrumb separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{  }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{  }}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
  <!-- </div> -->
</template>

<script>
import SideNavBar from "../components/SideNavBar.vue";
export default {
  name: "HomeView",
  components: { SideNavBar },
  data() {
    return {
      isCollapse: false,
      navs: [],
      route: this.$router.currentRoute._value.fullPath
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem('token')
      this.$router.push({ path:'/' })
    }
  },
  created() {
    this.$api.loadNav()
    .then(data => {
      // console.log(data)
      this.navs = data
    })
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-aside {
  background-color: var(--info);
  // width: fit-content;
  max-width: 260px;
  transition: .3s;
}

.collapsed.el-aside {
  width: 63px;
}

.el-header {
  background-color: white;
  box-shadow: 0 0 10px var(--info);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-main {
  // background-color: white;
}

.el-breadcrumb {
  margin-bottom: 1rem;
}

.el-dropdown{
  display: flex;
  align-items: center;
}

.el-dropdown img{
  width: 2rem;
  height: 2rem;
  border-radius: .2rem;
  float: left;
}

.el-dropdown .el-icon{
  font-size: 1rem;
}

.el-dropdown-link{
  display: flex;
  align-items: center;
}

.el-dropdown-link span{
  margin: 0 10px;
}

.el-icon{
  font-size: 2rem;
}
</style>