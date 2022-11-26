<template>
  <nav>
    <div class="logo">
      <img src="../assets/imgs/shop.png" alt="">
      <span class="main-title" v-show="!isCollapse">电商后台管理系统</span>
    </div>

    <el-menu text-color="#fff" active-text-color="#ffd04b" background-color="#545c64" :default-active="activeIndex" unique-opened
      class="el-menu-vertical-demo" :collapse="isCollapse" @select="changeIndex">
      <!-- <el-sub-menu>
        <template #title>
          <img src="../assets/imgs/shop.png" alt="">
          <h1 v-show="!isCollapse">电商后台管理系统</h1>
        </template>
      </el-sub-menu> -->
      <el-sub-menu :index="`${index + 1}`" v-for="(nav, index) in navs" :key="nav.id">
        <template #title>
          <el-icon><i class="iconfont icon-shouye"></i></el-icon>
          <span>{{ nav.authName }}</span>
        </template>
        <el-menu-item :index="`${index + 1}-${i + 1}`" :key="subNav.id" v-for="(subNav, i) in nav.children"
          @click="navigateTo(subNav.path)">
          <el-icon>
            <Menu />
          </el-icon>{{ subNav.authName }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </nav>
</template>

<script>
export default {
  props: ["isCollapse", "navs"],
  data() {
    return {
      activeIndex: sessionStorage.getItem('activeIndex'),
    };
  },
  methods: {
    navigateTo(url, query) {
      this.$router.push({ path: '/home/' + url, query: query });
    },
    changeIndex(index) {
      // console.log('index ',index)
      // console.log('indexPath ',indexPath)
      // console.log('item ',item)
      this.activeIndex = index
      sessionStorage.setItem('activeIndex', index)
    }
  },
  computed: {
    iconClass(value) {
      if (value == '首页') {
        return 'iconfont icon-shouye'
      } else if (value == '用户管理') {
        return 'iconfont icon-shouye'

      } else if (value == '权限管理') {
        return 'iconfont icon-shouye'
      }
      else if (value == '商品管理') {
        return 'iconfont icon-shouye'
      } else if (value == '订单管理') {
        return 'iconfont icon-shouye'
      }
      return ''
    }
  }
};
</script>

<style scoped>
nav {
  background-color: #545c64;
  position: relative;
  left: 0;
  top: 0;
  height: 100%;
  /* min-width: 100%; */
  /* max-width: 260px; */
  padding: 0;
  color: white;
}

.el-menu {
  /* height: 100%; */
  /* width: 100%; */
  /* border-right: unset; */
  /* border-top: 1px solid var(--info); */
  border: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 260px; */
  /* min-height: 400px; */
}

.el-menu--collapse>.el-sub-menu>.el-sub-menu__title>span {
  /* visibility: hidden; */
}

.logo {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: .5rem 0;
  width: 90%;
}

.logo span {
  font-size: 1.25rem;
}

.logo img {
  width: 2.75rem;
  height: 2.75rem;
}

.main-title{
  position: relative;
}
</style>