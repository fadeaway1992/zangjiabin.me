<template>
  <div class="component-container" :style="{'maxHeight':maxHeight+'px'}" ref="post">
    <h2 class="post-title"><a :href="'/posts/' + post.id">{{post.title}}</a></h2><!-- 标题 -->
    <p class="post-time">发布于 {{post.postDate}}</p>
    <p class="post-labels" v-if="post.labels && post.labels.length">
      <span v-for="label in post.labels" :key="label">#{{label}}&nbsp;&nbsp;</span>
    </p>
    <div class="post-body" ref="postContent" v-html="makeHtml(post.body)"></div><!-- 正文 -->
    <div class="mask" v-show="mask" @click="removeMask">展开</div>
  </div>
</template>

<script>
import showdown from 'showdown'
import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'
export default {
  name: 'PostContainer',
  data () {
    return {
      mask: false,
      maxHeight: 600
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      if(this.$refs.post.scrollHeight > this.maxHeight) {
        this.mask = true
        console.log('mask')
      }
      this.$refs.postContent.querySelectorAll('code').forEach(code => {
        highlight.highlightBlock(code)
      });
    })
  },
  methods: {
    makeHtml (source) {
      return new showdown.Converter().makeHtml(source)
    },
    removeMask () {
      this.mask = false
      this.maxHeight = 9999999
    }
  }
}
</script>

<style lang="scss" scoped>
.component-container {
  position: relative;
  overflow: hidden;
  .mask {
    position: absolute;
    width: 100%;
    height: 70px;
    line-height: 70px;
    font-size: 20px;
    font-weight: 500;
    bottom: 0;
    left: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 80%);
    text-align: center;
    color: #78bd86;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>


