<template>
  <div id="backend">
    <Backend>
      <main class="uk-container uk-margin">
        <slot></slot>
      </main>
    </Backend>
  </div>
</template>
<script>
import Backend from '@/components/backend/Backend'
export default {
  name: 'Article',
  components: {
    'Backend': Backend
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
