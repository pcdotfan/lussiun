<template>
    <section class="articles">
        <article class="uk-article" v-for="article in articles" :key="article.id">
            <h3 class="title uk-article-title">
                <a href="/post/code/ydkjs-this" v-text="article.title"></a>
            </h3>
            <div class="lead uk-text-lead" v-html="getExcerpt(article.content)">

            </div>
            <div class="meta uk-article-meta">
                <span class="item">
                <vk-icon class="icon" icon="calendar" ratio="0.8"></vk-icon>
                <time datetime="2018-02-17">2018.02.17</time>
                </span>
                <span class="item">
                <vk-icon class="icon" icon="code" ratio="0.8"></vk-icon>
                <a href="/category/code">Code</a>
                </span>
                <span class="item">
                <vk-icon class="icon" icon="comment" ratio="0.8"></vk-icon>
                <a href="/post/code/ydkjs-this#comments">0 评</a>
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
