<template>
    <div class="uk-grid-medium" uk-grid>
        <div class="uk-width-1-4@m uk-width-1-1">
            <control-sidebar></control-sidebar>
        </div>
        <div class="uk-width-3-4@m uk-width-1-1">
            <list></list>
        </div>
    </div>
</template>
<script>
import ControlSidebar from '~/components/backend/ArticlesControlSidebar'
import List from '~/components/backend/ArticlesList'
export default {
  layout: 'articles',
  components: {
    ControlSidebar, List
  },
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>
