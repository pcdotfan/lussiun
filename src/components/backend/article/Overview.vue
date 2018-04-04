<template>
  <Article>
    <div class="uk-grid-medium" uk-grid>
      <div class="uk-width-1-4@m uk-width-1-1">
        <OverviewSidebar></OverviewSidebar>
      </div>
      <div class="uk-width-3-4@m uk-width-1-1">
        <ArticlesList></ArticlesList>
      </div>
    </div>
  </Article>
</template>
<script>
import Article from '@/components/backend/article/Article'
import OverviewSidebar from '@/components/backend/article/OverviewSidebar'
import ArticlesList from '@/components/backend/article/ArticlesList'
export default {
  name: 'Overview',
  components: {
    'Article': Article,
    'OverviewSidebar': OverviewSidebar,
    'ArticlesList': ArticlesList
  },
  data() {
    return {
    }
  },
  mounted() {
  }
}
</script>
