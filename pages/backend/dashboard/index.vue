<template>
  <div id="backend">
    <main class="uk-container uk-margin">
        <div class="overview">
            <div class="uk-grid uk-child-width-1-4@m uk-child-width-1-2" uk-grid>
            <OverviewCard title="文章">
                <p>正在调试……</p>
            </OverviewCard>
            <OverviewCard title="分类目录">
                <p>正在调试……</p>
            </OverviewCard>
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
  data() {
    return {
    }
  },
  mounted() {
    this.$store.commit('changeHero', {
      heroTitle: '控制面板',
      heroDescription: 'Some insights and statistics'
    })
  }
}
</script>
