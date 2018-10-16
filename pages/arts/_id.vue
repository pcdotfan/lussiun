<template>
  <div>
    <h1 v-text="article.title" class="title"></h1>
    <article class="content">
      <div class="meta">
          <span class="item">
              <i class="fa fa-calendar-o"></i>
              <time :datetime="getDate(article.updatedAt)" v-text="getDate(article.updatedAt)"></time>
          </span>
          <span class="item">
              <i class="fa fa-code"></i>
              <router-link :to="'/category/' + article.categoryId" v-text="article.__category__.name"></router-link>
          </span>
          <span class="item">
              <i class="fa fa-comment-o"></i>
              <a href="#comments">{{ article.commentCount }} 评</a>
          </span>
      </div>
      <div class="article-content" v-html="getRendered(article.content)">
      </div>
    </article>
    <!--<comment-section :article="id"></comment-section>-->
  </div>
</template>

<script>
// import CommentSection from '@/components/CommentSection'
const excerptHtml = require('excerpt-html')
const hljs = require('highlight.js')
const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }

    return '' // use external default escaping
  }
})
const moment = require('moment')
export default {
  name: 'Article',
  components: {
  },
  head () {
    return {
      title: this.article.title + ' | ' + this.$nuxt.$options.head.site.title,
      meta: [
        { hid: 'description', name: 'description', content: this.getExcerpt(this.article.content) }
      ]
    }
  },
  async asyncData ({ app, params }) {
    let data = (await app.$axios.get(`/articles/${params.id}`)).data
    return { article: data }
  },
  methods: {
    getExcerpt (str) {
      return excerptHtml(md.render(str), {
        pruneLength: 240 // Amount of characters that the excerpt should contain
      })
    },
    getRendered (mdContent) {
      return md.render(String(mdContent))
    },
    getDate (date) {
      return moment(date).format('YYYY.MM.DD')
    }
  }
}
</script>

<style>
</style>
