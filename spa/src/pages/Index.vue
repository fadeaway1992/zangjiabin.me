<template>
  <div class="page-container index-page flex-row-left">
    <!-- 侧栏 -->
    <side-navi/>
    <!-- 索引列表 -->
    <div class="posts-container">
      <ul class="post-list" v-if="posts.length">
        <li class="post-list-item" v-for="post in posts" :key="post.id">
          <h3 class="post-title"><a :href="'/posts/' + post.id">{{post.title}}</a></h3>
          <p class="post-date">{{post.postDate}}</p>
          <p class="post-labels" v-if="post.labels && post.labels.length">
            <span v-for="label in post.labels" :key="label">#{{label}}&nbsp;&nbsp;</span>
          </p>
        </li>
      </ul>
      <div class="bottom-navi-container">
        <button class="last-page" v-if="page > 1" @click="getBlogIndex(page - 1)">上一页</button>
        <span class="current-page">第{{page}}页</span>
        <button class="next-page" v-if="more"  @click="getBlogIndex(page + 1)">下一页</button>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavi from '@/components/SideNavi.vue'
import { getBlogIndex } from '@/http/blog.js'
export default {
  name: 'Index',
  data () {
    return {
      posts: [],
      more: true,
      page: 1
    }
  },
  components: {
    SideNavi
  },
  created () {
    this.getBlogIndex(1)
  },
  methods: {
    getBlogIndex (page) {
      return getBlogIndex({page}).then((res) => {
        this.page = res.data.page
        this.posts = res.data.posts
        this.more = res.data.more
      }).catch((err) => {
        console.log(err, '获取文章列表时出错')
      })
    }
  }
}
</script>

<style lang="scss">
.page-container.index-page {
  width: 960px;
  margin: 0 auto;
  margin-top: 30px;
  .posts-container {
    .post-list {
      margin: 0;
      padding: 0;
      .post-list-item {
        margin-bottom: 1.5rem;
        .post-title {
          font-size: 1.2rem;
          &:hover {
            color: #57ad68;
          }
        }
        .post-date {
          margin: 0;
          font-size: 0.8rem;
          color: #b3b3b1;
        }
        .post-labels {
          margin: 0;
          font-size: 0.8rem;
          color: #b3b3b1;
        }
      }
    }
    .bottom-navi-container {
      margin-bottom: 20px;
      .last-page {
        font-size: 0.5rem;
        color: #8e8e8e;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .current-page {
        color: #8e8e8e;
        font-size: 0.5rem;
      }
      .next-page {
        font-size: 0.5rem;
        color: #8e8e8e;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .page-container.index-page {
    width: 100%;
    box-sizing: border-box;
    padding: 3vw;
    margin: 0;
    flex-direction: column;
  }
}
</style>

