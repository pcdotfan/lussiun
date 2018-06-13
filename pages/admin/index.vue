<template>
  <div id="backend">
    <main class="uk-container">
        <div class="overview uk-margin-top">
            <vk-grid class="uk-child-width-1-3@m uk-child-width-1-2">
              <div>
                <vk-card class="recent-posts" padding="small">
                  <h4>最近发布的文章</h4>
                  <ul class="uk-list">
                    <li v-for="article in recentArticles" :key="article.id">
                      <span v-text="dateFormatted(article.updatedAt)"></span>
                       <router-link :to="{ name: 'admin-articles-id', params: { id: article.id } }">{{ article.title }}</router-link>
                    </li>
                  </ul>
                </vk-card>
              </div>
            </vk-grid>
        </div>
    </main>
  </div>
</template>
<script>
const moment = require('moment')
export default {
  name: 'Dashboard',
  layout: 'backend',
  data () {
    return {
      recentArticles: []
    }
  },
  async mounted () {
    this.$store.commit('changeHero', {
      title: '控制面板',
      description: 'Some insights and statistics'
    })
    this.recentArticles = await this.$axios.$get('/articles?status=2')
  },
  methods: {
    dateFormatted (date) {
      return moment(date).format('MM.DD')
    }
  }
}
</script>
