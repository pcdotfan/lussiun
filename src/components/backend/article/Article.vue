<template>
  <div id="backend">
    <Backend>
      <main class="uk-container uk-margin">
        <div class="uk-grid-medium" uk-grid>
            <div class="uk-width-1-4@m uk-width-1-1">
              <OverviewSidebar></OverviewSidebar>
            </div>
            <div class="uk-width-3-4@m uk-width-1-1">
              <ArticlesList></ArticlesList>
            </div>
        </div>
      </main>
    </Backend>
  </div>
</template>
<script>
import Backend from '@/components/backend/Backend'
import OverviewSidebar from '@/components/backend/article/OverviewSidebar'
import ArticlesList from '@/components/backend/article/ArticlesList'
export default {
  name: 'Article',
  components: {
    'Backend': Backend,
    'OverviewSidebar': OverviewSidebar,
    'ArticlesList': ArticlesList
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$store.commit('changeHero', {
      heroTitle: '文章',
      heroDescription: '屈平词赋悬日月，楚王台谢空山丘。',
      heroNavbarItems: [
        { title: '文章列表', path: '/backend/articles' },
        { title: '撰写文章', path: '/backend/articles/new' }
      ]
    })
  }
}
</script>
