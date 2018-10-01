<template>
  <div class="dashboard-page page-container">
    <!-- 文章 -->
    <div class="posts-container">
      <!-- 一篇文章 -->
      <div class="post-container" v-if="posts.length" v-for="post in posts" :key="post.id">
        <h2 class="post-title"><a :href="'/posts/' + post.id">{{post.title}}</a></h2><!-- 标题 -->
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
  .post-title {
    color: #262626;
    a:hover {
      color: #57ad68;
    }
  }
}
</style>
