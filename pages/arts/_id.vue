<template>
<article class="content">
    <h1>解决 Yarn  / NPM 从 GitHub 下载 Node-SASS 导致安装速度过慢的问题</h1>
    <div class="meta">
        <span class="item">
            <i class="fa fa-calendar-o"></i>
            <time :datetime="getDate(article.updatedAt)" v-text="getDate(article.updatedAt)"></time>
        </span>
        <span class="item">
            <i class="fa fa-code"></i>
            <a href="/category/writing" v-text="article.__category__.name"></a>
        </span>
        <span class="item">
            <i class="fa fa-comment-o"></i>
            <a href="/post/writing/2018-04-19-23-50-51#comments">{{ article.commentCount }} Comment(s)</a>
        </span>
    </div>
    <div class="post" v-html="getRendered(article.content)">
    </div>

  </article>
</template>

<script>
const MarkdownIt = require('markdown-it')
const moment = require('moment')
const md = new MarkdownIt()
export default {
  name: 'Article',
  components: {
  },
  data () {
    return {
      article: {
        __category__: {}
      },
      id: 0
    }
  },
  methods: {
    getRendered (mdContent) {
      return md.render(String(mdContent))
    },
    getDate (date) {
      return moment(date).format('YYYY.MM.DD')
    }
  },
  async mounted () {
    this.id = Number(this.$route.params.id)
    this.article = (await this.$axios.get(`/articles/${this.id}`)).data
  }
}
</script>

<style>
</style>
