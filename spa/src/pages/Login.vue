<template>
  <div class="login-page page-container">
    <div class="login-panel">
      <label class="label-password" for="password">请输入管理员密码</label>
      <input class="password" type="password" id="password" v-model="password" @keypress.13="login">
      <button class="btn-submit" @click="login">登 录</button>
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
        username: 'zangjiabin',
        password: ''
      }
    },
    methods: {
      login () {
        const username = this.username
        const password = this.password
        postLogin({username, password}).then((res) => {
          const token = res.data.token
          localStorage.token = token
          this.$router.push('/')
        }).catch((err) => {
          if (err.response) {
            const error = err.response.data.error
            window.alert(error.message)
          }
        })
      }
    },
    created () {
      document.body.classList.add('login-page')
    },
    beforeDestroy() {
      document.body.classList.remove('login-page')
    }
  }
</script>

<style lang="scss">
body.login-page {
  background: url(../assets/bg.jpg) repeat fixed center top/cover;
}
.login-page.page-container {
  padding: 20px;
  .login-panel {
    width: 400px;
    box-sizing: border-box;
    padding: 1.2em;
    background: #fff;
    .label-password {
      font-size: 1em;
    }
    .password {
      height: 3em;
      margin: 2em 0;
      background: #faffbd;
      border: 1px solid #aab7c2;
      box-sizing: border-box;
      padding: 1em;
      font-size: 0.8em;
    }
    .btn-submit {
      height: 2em;
      font-size: 1.2em;
      color: #fff;
      font-weight: 500;
      background:#0eb980;
      &:hover {
        background: #15976c;
      }
      &:active {
        background: #0e815b;
      }
    }
    input, .btn-submit {
      width: 100%;
      box-sizing: border-box;
      display: block;
    }
  }
  .label-password {
    display: block;
  }
  @media screen and (max-width: 600px) {
    .login-panel {
      width: 100%;
      background: rgba(255, 255, 255, 0.6);
    }
  }
}
</style>
