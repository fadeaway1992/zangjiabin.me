<template>
  <div class="dashboard-page page-container flex-row-left">
    <!-- 侧栏 -->
    <SideNavi/>
    <!-- 文章 -->
    <div class="posts-container">
      <router-link v-if="admin" class="go-edit" to="/edit">发布新文章</router-link>
      <!-- 一篇文章 -->
      <div class="post-wrapper" v-if="posts.length">
        <div class="post-container" v-for="post in posts" :key="post.id">
          <PostContainer :post="post" :maxHeight="maxHeight" />
        </div>
      </div>
      <div class="show-more">
        <a class="goto-indexes" href="/index">查看更多文章</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getLoginStatus } from '@/http/session.js'
import { getBlogs } from '@/http/blog.js'
import PostContainer from '@/components/PostContainer.vue'
import SideNavi from '@/components/SideNavi.vue'
export default {
  name: 'Dashboard',
  components: {
    SideNavi,
    PostContainer
  },
  data () {
    return {
      page: 1,
      posts: [],
      admin: false,
      maxHeight: 600
    }
  },
  created () {
    this.getBlogs(1)
    getLoginStatus().then((res) => {
      if (res.data.user.role === 'admin') {
        this.admin = true
      }
    }).catch((err) => {
      console.dir(err)
      next('/')
    })
  },
  methods: {
    getBlogs (page) {
      return getBlogs({page}).then((res) => {
        this.page = res.data.page
        this.posts = res.data.posts
      })
    }
  }
}
</script>

<style lang="scss">
.dashboard-page.page-container {
  width: 960px;
  margin: 0 auto;
  margin-top: 30px;
  .posts-container {
    width: 700px;
    .go-edit {
      display: block;
      height: 2em;
      color: #fff;
      font-size: 1.2em;
      padding: 0.5em 0;
      line-height: 1em;
      box-sizing: border-box;
      background: #78bd86;
      text-align: center;
      &:hover {
        background: #57ad68;
      }
    }
    .post-container {
      &:not(:first-child) {margin-top: 35px;}
      .post-title {
        margin-bottom: 5px;
        color: #262626;
        a:hover {
          color: #57ad68;
        }
      }
      .post-time {
        font-size: 0.8rem;
        margin: -5px 0;
        color: #b3b3b1;
      }
      .post-labels {
        font-size: 0.8rem;
        margin: 5px 0;
        color: #b3b3b1;
      }
      .post-body {
        line-height: 1.5em;
        margin-top: 10px;
        h1, h2, h3, h4, h5, h6 {
          margin: 0.5em 0;
        }
        ul, ol {
          list-style: initial;
          padding-inline-start: 1.5em;
        }
        ol {
          list-style-type: decimal;
        }
        a {
          color: #78bd86;
          text-decoration: underline;
          &:hover {
            color: #57ad68;
          }
        }
        code {
          display: block;
          background: #eff0f1;
          padding: 0.2em 0.5em;
          line-height: 2em;
          word-break: break-all;
          margin: 0.5em 0;
          white-space: pre;
        }
        img {
          display: block;
          margin: 10px 0;
          max-width: 680px;
        }
        blockquote {
          margin-left: 0;
          padding-left: 10px;
          border-left: 4px solid #cccccc;
          color: #8c8c8c;
        }
      }
    }
    .show-more {
      margin: 20px 0;
      a.goto-indexes {
        font-size: 0.8rem;
        color: #8e8e8e;
        &:hover {
          color: #57ad68;
          text-decoration: underline;
        }
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .dashboard-page.page-container.flex-row-left {
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    margin-top: 0;
    padding: 3vw;
    .posts-container {
      width: 100%;
      .go-edit {
        display: none;
      }
      .post-container {
        .post-body {
          img {
            max-width: 100%;
          }
        }
      }
    }
  }
}
</style>
