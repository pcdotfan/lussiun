<template>
<article class="content">
    <h1>文章归档</h1>
    <div class="meta">
        共有...篇文章
    </div>
    <h2>2018</h2>
    <ul class="archived-posts">
        <li>
            <time datetime="2018-04-19">04.19</time>
            <a href="/post/writing/2018-04-19-23-50-51">2018-04-19 23-50-51</a>
            <span>Writing</span>
            <span>40度</span>
        </li>
    </ul>

  </article>
</template>

<script>
const moment = require('moment')
export default {
  name: 'Archive',
  components: {
  },
  data () {
    return {
      articles: []
    }
  },
  methods: {
    getDate (date) {
      return moment(date).format('YYYY.MM.DD')
    }
  },
  async mounted () {
    this.articles = (await this.$axios.get(`/articles/`)).data
  }
}
</script>

<style>
</style>
