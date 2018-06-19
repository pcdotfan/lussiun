<template>
    <section class="articles">
        <div class="article" v-for="article in articles" :key="article.id">
            <div class="media">
                <div class="media-content">
                    <h2 class="title article-title"><router-link :to="'/arts/' + article.id" v-text="article.title"></router-link></h2>
                </div>
            </div>
            <div class="content article-body">
                <p v-html="getExcerpt(article.content)"></p>
            </div>
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
        </div>
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
      return excerptHtml(md.render(str), {
        pruneLength: 240 // Amount of characters that the excerpt should contain
      })
    },
    getDate (date) {
      return moment(date).format('YYYY.MM.DD')
    }
  },
  async mounted () {
  }
}
</script>
