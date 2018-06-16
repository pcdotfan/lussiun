<template>
    <section class="article-list">
        <article v-for="article in articles" :key="article.id">
            <h2>
                <router-link :to="'/arts/' + article.id" v-text="article.title"></router-link>
            </h2>
            <div class="excerpt"><p v-html="getExcerpt(article.content)"></p></div>
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
                  <a href="/post/writing/2018-04-19-23-50-51#comments">{{ article.commentCount }} 评</a>
              </span>
            </div>
        </article>
    </section>
</template>

<script>
const excerptHtml = require('excerpt-html')
const MarkdownIt = require('markdown-it')
const moment = require('moment')
const md = new MarkdownIt()
export default {
  name: 'ArticleList',
  props: ['articles'],
  data () {
    return {
    }
  },
  methods: {
    getExcerpt (str) {
      return excerptHtml(md.render(str))
    },
    getDate (date) {
      return moment(date).format('YYYY.MM.DD')
    }
  },
  async mounted () {
  }
}
</script>
