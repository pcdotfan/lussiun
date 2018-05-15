<template>
    <main class="uk-container uk-margin-top">   
        <div class="uk-grid-medium" uk-grid>
            <div class="uk-width-1-4@m uk-width-1-1">
                <control-sidebar></control-sidebar>
            </div>
            <div class="uk-width-3-4@m uk-width-1-1">
                <list></list>
            </div>
        </div>
    </main>
</template>
<script>
import ControlSidebar from '~/components/backend/ArticlesControlSidebar'
import List from '~/components/backend/ArticlesList'
export default {
  name: 'ArticlesIndex',
  layout: 'backend',
  components: {
    ControlSidebar, List
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$store.commit('changeHero', {
      title: '文章',
      description: '屈平词赋悬日月，楚王台谢空山丘。',
      navbarItems: [
        { title: '文章列表', path: '/backend/articles' },
        { title: '撰写文章', path: '/backend/articles/new' }
      ]
    })
  }
}
</script>
