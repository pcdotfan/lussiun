<template>
  <div id="backend">
    <DHeader></DHeader>
    <DHero title="控制面板" description="Some insights and statistics"></DHero>
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
import Header from '@/components/backend/Header'
import Hero from '@/components/backend/Hero'
import OverviewCard from '@/components/backend/dashboard/OverviewCard'
export default {
  name: 'Dashboard',
  components: {
    'DHeader': Header,
    'DHero': Hero,
    'OverviewCard': OverviewCard
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}

</script>
