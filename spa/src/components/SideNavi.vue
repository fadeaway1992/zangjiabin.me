<template>
  <div class="side-bar">
    <div class="content">
      <a class="avatar-container" href="/profile">
        <img class="avatar" src="../../../favicon_package/apple-touch-icon.png">
        <p class="aboutme">About me</p>
      </a>
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
    .avatar-container {
      display: block;
      position: relative;
      width: 100px;
      height: 100px;
      margin: 0 auto;
      margin-bottom: 10px;
      border-radius: 50%;
      overflow: hidden;
      img.avatar {
        display: block;
        height: 100%;
        transition: opacity 0.3s;
      }
      .aboutme {
        transition: all 0.3s;
        position: absolute;
        bottom: -17px; left: 0;
        width: 100%;
        text-align: center;
        background: #000;
        margin: 0;
        font-size: 10px;
        color: #fff;
        padding: 2px 0 5px;
        opacity: 0;
      }
    }

    .avatar-container:hover {
      img.avatar {
        opacity: 0.7;
      }
      .aboutme {
        opacity: 1;
        bottom: 0;
      }
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
    .content {
      .avatar-container {
        .aboutme {
          opacity: 1;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
}
</style>


