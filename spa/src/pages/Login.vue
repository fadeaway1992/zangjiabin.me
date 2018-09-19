<template>
  <div class="login-page page-container">
    <div class="login-panel">
      <label class="label-username">用户名<input type="text" name="username" v-model="username"></label>
      <br>
      <label class="label-password">密码<input type="password" name="password" v-model="password" @keypress.13="login"></label>
      <br>
      <input class="btn-submit" type="submit" value="登录" @click="login">
    </div>
  </div>
</template>

<script>
  import {postLogin} from '@/http/session.js'
  import Cookies from 'js-cookie'
  export default {
    name: 'Login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login () {
        const blankRegExp = /^\s*$/g
        if (blankRegExp.test(this.username)) {
          window.alert('用户名不能为空')
          return
        }
        const username = this.username
        const password = this.password
        postLogin({username, password}).then((res) => {
          console.log('登录成功')
        }).catch((err) => {
          if (err.response) {
            const error = err.response.data.error
            window.alert(error.message)
          }
        })
      }
    },
    created () {

    }
  }
</script>

<style lang="scss">

</style>
