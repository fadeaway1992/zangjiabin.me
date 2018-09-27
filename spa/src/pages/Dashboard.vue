<template>
  <div>
    <div v-if="posts.length" v-for="post in posts" :key="post.id">
      <h2>{{post.title}}</h2>
      <div v-html="markdown().toHTML(post.body)"></div>
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