<template>
  <div class="layout">
    <el-container v-if="showMenu" class="container">
      <!-- 左侧边栏 -->
      <el-aside class="aside">
        <div class="head">
          <img src="./assets/images/logo.jpg" alt="logo" />
          <span>小宝后台</span>
        </div>
        <el-menu background-color="#222832" text-color="#fff" :router="true">
          <!-- 多层 -->
          <el-submenu index="1">
            <template #title>
              <span>一级菜单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/">
                <i class="el-icon-data-line" />首页
              </el-menu-item>
              <el-menu-item index="/add">
                <i class="el-icon-reading" />添加
              </el-menu-item>
            </el-menu-item-group>
            <!-- <el-submenu index="1-4">
              <template #title>十二符咒</template>
              <el-menu-item index="1-4-1">龙</el-menu-item>
            </el-submenu>-->
          </el-submenu>

          <!-- 单层 -->
          <!-- <el-menu-item index="2">
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span>Navigator Four</span>
          </el-menu-item>-->
        </el-menu>
      </el-aside>

      <!-- 右边内容 -->
      <el-container class="content">
        <Header />
        <div class="main">
          <router-view></router-view>
        </div>
        <Footer />
      </el-container>
    </el-container>

    <el-container v-else class="container">
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import { ref, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"
import { localGet, pathMap } from "./utils"
const ENV = import.meta.env
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup() {
    const showMenu = ref(true)
    const noMenu = ['login']
    const router = useRouter()

    // 这种写法会晚，因为组件都加载出来了，在判断就晚了
    // showMenu.value = noMenu.includes(location.hash.split('/')[1]) === true ? false : true

    router.beforeEach((to, from, next) => {
      // 要进入登录页面
      if (to.path === '/login') {
        next()
      } else {
        // 进入其他路由页面要进行鉴权
        if (localGet('token')) {
          // 本地有token，鉴权通过
          next()
        } else {
          // 没有登录，需要登录
          router.push({ path: '/login' })
        }
      }

      showMenu.value = !noMenu.includes(to.name)
    })

    // 成功切换路由后，更新网页title
    router.afterEach((to) => {
      document.title = pathMap[to.name]
    })

    return {
      showMenu
    }

  }
}
</script>

<style lang="less" scoped>
.layout {
  background-color: #fff;
  .container {
    min-height: 100vh;
    // 左侧边栏
    .aside {
      width: 200px !important;
      background-color: #222832;
      // 导航栏--头部
      .head {
        display: flex;
        align-items: center;
        justify-content: space-around;
        img {
          width: 50px;
        }
        span {
          cursor: default;
          font-size: 20px;
          color: #ffffff;
        }
      }
      // 导航栏--路由
      .el-menu {
        border-right: none !important;
        .el-submenu {
          border-top: 1px solid hsla(0, 0%, 100%, 0.05);
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          &:first-child {
            border-top: none;
          }
          &[class^="el-icon-"] {
            vertical-align: -1px !important;
          }
        }
      }
    }

    // 右边
    .content {
      display: flex;
      flex-direction: column;
      height: 100vh;
      .main {
        padding: 10px;
        height: calc(100vh - 100px);
        overflow: auto;
      }
    }
  }
}
</style>