<template>
  <div class="edit-page page-container">
    <h2 class="page-header">编辑页面</h2>
    <div class="title-container">
      <input type="text" class="title" v-model="title" placeholder="请输入标题">
    </div>
    <div class="flex-row-between edit-container">
      <textarea class="editor" v-model="sourceCode"></textarea>
      <div class="preview" v-html="htmlCode"></div>
    </div>
    <div class="upload">
      <input type="file" multiple name="images" accept="image/jpeg, image/png, image/jpg, image/gif" @change="uploadImages">
      <div>
        <p v-for="path in imagePaths" :key="path">{{path}}</p>
      </div>
    </div>
    <div class="submit-container flex-row-right">
      <button class="submit" @click="post">发布</button>
    </div>
  </div>
</template>

<script>
import { getLoginStatus } from '@/http/session.js'
import { postBlog, getBlogDetail, updateOneBlog } from '@/http/blog.js'
import { uploadImages } from '@/http/upload.js'
import { markdown } from 'markdown'
import axios from 'axios'
export default {
  name: 'Edit',
  data () {
    return {
      sourceCode: '',
      title: '',
      imagePaths: []
    }
  },
  computed: {
    htmlCode () {
      return markdown.toHTML(this.sourceCode)
    }
  },
  beforeRouteEnter (to, from, next) {
    getLoginStatus().then((res) => {
      if (res.data.user.role === 'admin') {
        next()
      } else {
        next('/')
      }
    }).catch((err) => {
      console.dir(err)
      next('/')
    })
  },
  created () {
    if (this.$route.params && this.$route.params.post_id) {
      this.isUpdate = true // 更新一篇文章
      const postId = this.$route.params.post_id
      getBlogDetail({postId}).then((res) => {
        console.log(res.data)
        this.sourceCode = res.data.body
        this.title = res.data.title
      }).catch((err) => {
        if (err.response && err.response.data.error) {
          const error = err.response.data.error
          console.log(error)
          if (error.code === 404) {
            this.$router.replace('/')
          }
        }
      })
    }
  },
  methods: {
    post () {
      const blankRegExp = /^\s*$/g
      if (blankRegExp.test(this.title)) {
        window.alert('请输入标题')
      } else if (blankRegExp.test(this.sourceCode)) {
        window.alert('请输入内容')
      } else {
        if (this.isUpdate) { // 更新
          updateOneBlog({postId: this.$route.params.post_id, title: this.title, content: this.sourceCode}).then((res) => {
            console.log(res, 'res')
          }).catch((err) => {
            if (err.response && err.response.data.error) {
              const error = err.response.data.error
              window.alert(error.message)
            }
          })
        } else { // 发布
          postBlog({title: this.title, content: this.sourceCode}).then((res) => {
            console.log(res, 'res')
          }).catch((err) => {
            if (err.response && err.response.data.error) {
              const error = err.response.data.error
              window.alert(error.message)
            }
          })
        }
      }
    },
    uploadImages (ev) {
      const files = ev.target.files
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append('image' + i, files[i])
      }
      uploadImages(formData).then(res => {
        this.imagePaths = res.data
      }).catch(err => {
        console.dir(err)
      })
    }
  }
}
</script>

<style lang="scss">
.edit-page.page-container {
  width: 960px;
  margin: 0 auto;
  margin-top: 20px;
  h2.page-header {
    text-align: center;
  }
  .title-container {
    padding: 15px;
    .title {
      font-size: 22px;
      width: 300px;
    }
  }
  .edit-container {
    margin-top: 20px;
    padding: 15px;
    textarea.editor {
      width: 450px;
      height: 600px;
      resize: none;
    }
    div.preview {
      width: 450px;
      height: 600px;
    }
  }
  .submit-container {
    margin: 15px 0 30px;
    .submit {
      padding: 0 5px;
      font-size: 20px;
    }
  }
}

</style>

