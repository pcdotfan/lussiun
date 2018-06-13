<template>
    <section class="article-list">
        <article v-for="article in articles" :key="article.id">
            <h2>
                <a href="/post/code/ydkjs-this" v-text="article.title"></a>
            </h2>
            <div class="excerpt"><p v-html="getExcerpt(article.content)"></p></div>
            <div class="meta uk-article-meta">
              <span class="item">
                  <i class="fa fa-calendar-o"></i>
                  <time datetime="2018-04-19">2018.04.19</time>
              </span>
              <span class="item">
                  <i class="fa fa-code"></i>
                  <a href="/category/writing">Writing</a>
              </span>

              <span class="item">
                  <i class="fa fa-battery-three-quarters"></i>
                  <span>39度</span>
              </span>
              <span class="item">
                  <i class="fa fa-comment-o"></i>
                  <a href="/post/writing/2018-04-19-23-50-51#comments">0评</a>
              </span>
            </div>
        </article>
    </section>
</template>

<script>
const excerptHtml = require('excerpt-html')
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()
export default {
  name: 'ArticleList',
  data () {
    return {
      articles: []
    }
  },
  methods: {
    getExcerpt (str) {
      return excerptHtml(md.render(str))
    }
  },
  async mounted () {
    this.articles = await this.$axios.get('/articles/?status=2')
    this.articles = this.articles.data
  }
}
</script>
