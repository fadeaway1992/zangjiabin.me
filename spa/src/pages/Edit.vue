<template>
  <div class="edit-page page-container">
    编辑页面
  </div>
</template>

<script>
import { getLoginStatus } from '@/http/session.js'
export default {
  name: 'Edit',
  created () {
    getLoginStatus().then((res) => {
      console.log(res)
    }).catch((err) => {
      console.dir(err)
    })
  }
}
</script>

<style lang="scss">

</style>

