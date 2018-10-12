<template>
  <div class="side-bar">
    <div class="content">
      <img class="avatar" src="../../../favicon_package/apple-touch-icon.png">
      <h4 class="slogan">Hello, World!</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideNavi'
}
</script>

<style lang="scss">
.side-bar {
  width: 180px;
  margin-right: 80px;
  .content {
    width: 100%;
    img.avatar {
      display: block;
      margin: 0 auto;
      margin-bottom: 10px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .slogan{
      text-align: center;
      font-size: 1.125rem;
    }
  }
}
@media screen and (max-width: 960px) {
  .side-bar {
    width: 100%;
    margin: 0 0 3vw;
    img.avatar {
      width: 20vw;
      height: 20vw;
    }
  }
}
</style>


