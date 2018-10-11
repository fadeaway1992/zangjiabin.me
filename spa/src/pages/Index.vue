<template>
  <div class="page-container index-page flex-row-left">
    <!-- 侧栏 -->
    <side-navi/>
    <!-- 索引列表 -->
    <div class="posts-container">
      <ul class="post-list">

      </ul>
    </div>
  </div>
</template>

<script>
import SideNavi from '@/components/SideNavi.vue'
export default {
  name: 'Index',
  components: {
    SideNavi
  },
}
</script>

<style lang="scss">
.page-container.index-page {
  width: 960px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>

