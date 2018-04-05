<template>
  <div id="backend">
    <main class="uk-container uk-margin">
      <slot></slot>
    </main>
  </div>
</template>
<script>
export default {
  name: 'Articles',
  layout: 'backend',
  data () {
    return {
    }
  },
  mounted () {
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
