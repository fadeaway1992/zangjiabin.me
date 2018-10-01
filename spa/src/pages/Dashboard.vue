<template>
  <div class="dashboard-page page-container flex-row-left">
    <!-- 侧栏 -->
    <div class="side-bar"></div>
    <!-- 文章 -->
    <div class="posts-container">
      <!-- 一篇文章 -->
      <div class="post-container" v-if="posts.length" v-for="post in posts" :key="post.id">
        <h2 class="post-title"><a :href="'/posts/' + post.id">{{post.title}}</a></h2><!-- 标题 -->
        <p class="post-time">发布于 {{post.postDate}}</p>
        <div class="post-body" v-html="markdown().toHTML(post.body)"></div><!-- 正文 -->
      </div>
    </div>
  </div>
</template>

<script>
import { getBlogs } from '@/http/blog.js'
import { markdown } from 'markdown'
export default {
  name: 'Dashboard',
  data () {
    return {
      page: 1,
      posts: []
    }
  },
  created () {
    this.getBlogs(1)
  },
  methods: {
    getBlogs (page) {
      return getBlogs({page}).then((res) => {
        this.page = res.data.page
        this.posts = res.data.posts
      })
    },
    markdown () {
      return markdown
    }
  }
}
</script>

<style lang="scss">
.dashboard-page.page-container {
  width: 960px;
  margin: 0 auto;
  .side-bar {
    width: 180px;
    background: #cccccc;
    margin-right: 80px;
  }
  .posts-container {
    width: 700px;
    .post-container {
      .post-title {
        margin-bottom: 5px;
        color: #262626;
        a:hover {
          color: #57ad68;
        }
      }
      .post-time {
        font-size: 0.8em;
        margin: -5px 0;
        color: #b3b3b1;
      }
      .post-body {
        line-height: 1.5em;
        blockquote {
          margin-left: 0;
          padding-left: 10px;
          border-left: 4px solid #cccccc;
          color: #8c8c8c;
        }
      }
    }
  }
}
</style>
