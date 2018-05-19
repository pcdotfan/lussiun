<template>
  <div id="backend">
    <main class="uk-container uk-margin">
        <div class="overview">
            <div class="uk-grid uk-child-width-1-4@m uk-child-width-1-2" uk-grid>
            </div>
        </div>
    </main>
  </div>
</template>
<script>
export default {
  name: 'Dashboard',
  layout: 'backend',
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$store.commit('changeHero', {
      title: '控制面板',
      description: 'Some insights and statistics'
    })
  }
}
</script>
