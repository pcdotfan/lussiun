<template>
  <div id="backend">
    <DHeader></DHeader>
    <DHero title="文章" description="屈平词赋悬日月，楚王台谢空山丘。">
        <nav class="hero-navbar uk-navbar-transparent uk-light">
            <div class="uk-container uk-container-medium">
                <div uk-navbar>
                    <ul class="uk-navbar-nav">
                        <li class="uk-active"><a href="#">文章列表</a></li>
                        <li><a href="#">撰写文章</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </DHero>
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
  </div>
</template>
<script>
import Header from '@/components/backend/Header'
import Hero from '@/components/backend/Hero'
import OverviewSidebar from '@/components/backend/article/OverviewSidebar'
import ArticlesList from '@/components/backend/article/ArticlesList'
export default {
  name: 'Article',
  components: {
    'DHeader': Header,
    'DHero': Hero,
    'OverviewSidebar': OverviewSidebar,
    'ArticlesList': ArticlesList
  },
  data() {
    return {}
  }
}

</script>
