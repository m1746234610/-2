<template>
  <div class="header">
    <div class="left">{{ name }}</div>
    <div class="right">
      <el-popover placement="bottom" :width="200" trigger="hover">
        <template #reference>
          <div class="author">
            <i class="icon el-icon-s-custom" />
            <!-- {{ userInfo && userInfo.nickName || '' }} -->
            <i class="el-icon-caret-bottom" />
          </div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from "vue"
import { useRouter } from "vue-router"
import { pathMap } from "@/utils"
import axios from "axios"
export default {
  name: 'Header',
  setup() {
    let visible = ref(false)
    // 获取路由实例
    const router = useRouter()
    const state = reactive({
      name: '首页',
      userInfo: null
    })

    // 初始化执行方法
    onMounted(() => {
      const pathname = window.location.hash.split('/')[1] || ''
      if (!['login'].includes(pathname)) {
        getUserInfo()
      }
    })
    // 获取用户信息
    const getUserInfo = async () => {
      const userInfo = await axios.get('/adminUser/profile')
      state.userInfo = userInfo
      console.log(state.userInfo);
    }

    // 成功切换路由后，更新header左侧信息
    router.afterEach((to) => {
      state.name = pathMap[to.name] || '默认'
    })

    return {
      ...toRefs(state),
      visible,
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>