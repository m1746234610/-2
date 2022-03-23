### form表单属性
<el-form
:model='userForm'
:rules='rules'

1. model: 用户输入的信息
  用途: 
  setup(){
    ...
    let state = reactive({
      userForm:{
        userAccount: '', // 账号
        userPassword: '', // 密码
      }
    })
  }

2. rules: 信息校验规则
  用途: 
    rules:[
      <!-- 
        key: 跟要校验的收集到的信息的名字保持一致
        value: 具体的验证规则
        key--value
        
        userAccount: {
          required: true // 是否必填
          message: '请输入活动名称' // 提示信息

          trigger: 'blur' // 触发检查的方式:
                              blur 失去焦点时检查
                              change 值发生改变时触发
          min: 6 // 最小长度
          max: 13 // 最大长度

          pattern: /^[a-z]+$/ // 使用正则（只能输入字母）
        }
      -->
      key:{}
    ]