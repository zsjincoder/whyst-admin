<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">请输入用户名和密码</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { login } from '@/api/admin'
export default {
  components: {
    LoginForm
  },
  methods: {
    handleSubmit ({ userName, password }) {
      login({ username: userName, password }, 'post').then(res => {
        let { authType, token } = res
        this.$store.commit('setUserData', { authType, token })
        this.$Message.success('登录成功，请稍后')
        this.$router.push({
          path: '/home'
        })
      })
    }
  }
}
</script>

<style>

</style>
