<template>
  <div id="backend">
    <Article :hero-title="heroTitle" hero-description="词源倒流三江水，笔阵独扫千人军。">
      <main class="uk-container uk-margin">
        <div class="uk-grid-medium" uk-grid>
            <div class="uk-width-1-4@m uk-width-1-1">
              123
            </div>
            <div class="uk-width-3-4@m uk-width-1-1">
            </div>
        </div>
      </main>
    </Article>
  </div>
</template>
<script>
import Article from '@/components/backend/article/Article'
export default {
  name: 'NewArticle',
  components: {
    'Article': Article,
  },
  data() {
    return {
    }
  }
}

</script>
