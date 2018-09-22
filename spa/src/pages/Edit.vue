<template>
  <div class="edit-page page-container">
    编辑页面
  </div>
</template>

<script>
import { getLoginStatus } from '@/http/session.js'
export default {
  name: 'Edit',
  beforeRouteEnter (to, from, next) {
    getLoginStatus().then((res) => {
      if (res.data.user.role === 'admin') {
        next()
      } else {
        next('/')
      }
    }).catch((err) => {
      console.dir(err)
      next('/')
    })
  }
}
</script>

<style lang="scss">

</style>

