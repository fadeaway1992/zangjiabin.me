<template>
  <div class="edit-page page-container">
    <h2 class="page-header">编辑页面</h2>
    <div class="title-container">
      <input type="text" class="title" v-model="title" placeholder="请输入标题">
      <input type="text" class="labels" v-model="labels" placeholder="给文章添加合适的标签">
    </div>
    <div class="flex-row-between edit-container">
      <div class="left-side">
        <textarea class="editor" v-model="sourceCode"></textarea>
        <div class="upload">
          <input type="file" multiple name="images" accept="image/jpeg, image/png, image/jpg, image/gif" @change="uploadImages">
          <div class="paths">
            <p class="path" v-for="path in imagePaths" :key="path">{{path}}</p>
          </div>
          <div class="submit-container flex-row-right">
            <button class="submit" @click="post" :disabled="isposting">发布</button>
          </div>
        </div>
      </div>
      <div class="preview" v-html="htmlCode"></div>
    </div>
  </div>
</template>

<script>
import { getLoginStatus } from '@/http/session.js'
import { postBlog, getBlogDetail, updateOneBlog } from '@/http/blog.js'
import { uploadImages } from '@/http/upload.js'
import showdown from 'showdown'
import axios from 'axios'
export default {
  name: 'Edit',
  data () {
    return {
      sourceCode: '',
      title: '',
      labels: '',
      imagePaths: [],
      isposting: false
    }
  },
  computed: {
    htmlCode () {
      return this.converter.makeHtml(this.sourceCode)
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
    this.converter = new showdown.Converter()
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
      if (this.isposting) return
      const blankRegExp = /^\s*$/g
      if (blankRegExp.test(this.title)) {
        window.alert('请输入标题')
      } else if (blankRegExp.test(this.sourceCode)) {
        window.alert('请输入内容')
      } else {
        this.isposting = true
        if (this.isUpdate) { // 更新
          updateOneBlog({postId: this.$route.params.post_id, title: this.title, content: this.sourceCode}).then((res) => {
            this.isposting = false
            console.log(res, 'res')
            alert('编辑成功')
            location.href = '/posts/' + res.data.id
          }).catch((err) => {
            this.isposting = false
            if (err.response && err.response.data.error) {
              const error = err.response.data.error
              window.alert(error.message)
            }
          })
        } else { // 发布
          const labels = this.labels === '' ? [] :this.labels.split(/\s*[,，]\s*/)
          postBlog({title: this.title, content: this.sourceCode, labels}).then((res) => {
            this.isposting = false
            console.log(res, 'res')
            alert('发布成功')
            location.href = '/posts/' + res.data.id
          }).catch((err) => {
            this.isposting = false
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
    input {
      display: block;
    }
    .title {
      font-size: 22px;
      width: 300px;
    }
    .labels {
      margin-top: 20px;
      font-size: 16px;
      width: 400px;
    }
  }
  .edit-container {
    margin-top: 20px;
    padding: 15px;
    .left-side {
      textarea.editor {
        width: 450px;
        height: 600px;
        resize: none;
      }
      .upload {
        .paths {
          .path {
          
          }
        }
        .submit-container {
          margin: 15px 0 30px;
          .submit {
            padding: 0 5px;
            font-size: 18px;
            cursor: pointer;
            &:hover {
              color: #57ad68;
            }
          }
        }
      }
    }
    div.preview {
      width: 450px;
      height: 600px;
      overflow-y: auto;
      line-height: 1.5em;
      margin: 0;
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
        max-width: 450px;
      }
      blockquote {
        margin-left: 0;
        padding-left: 10px;
        border-left: 4px solid #cccccc;
        color: #8c8c8c;
      }
    }
  }
}

</style>

