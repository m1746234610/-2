import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 按需引入
import {
  ElButton,
  ElContainer,
  ElAside,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElRow,
  ElIcon,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElPopover,
  ElTag,
  ElCard,
} from 'element-plus'
// 自定义主题颜色
import '~/theme/index.css'
// 默认主题颜色
// import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

app.use(router)
app.use(ElButton)
  .use(ElContainer)
  .use(ElAside)
  .use(ElMenu)
  .use(ElSubmenu)
  .use(ElMenuItemGroup)
  .use(ElMenuItem)
  .use(ElRow)
  .use(ElIcon)
  .use(ElCol)
  .use(ElForm)
  .use(ElFormItem)
  .use(ElInput)
  .use(ElCheckbox)
  .use(ElPopover)
  .use(ElTag)
  .use(ElCard)

app.mount('#app')