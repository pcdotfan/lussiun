<template>
  <div id="backend">
    <main class="uk-container">
        <div class="overview uk-margin-top">
            <vk-grid class="uk-child-width-1-3@m uk-child-width-1-2">
              <div>
                <vk-card class="recent-posts" padding="small">
                  <h4>最近发布的文章</h4>
                  <ul class="uk-list"><li><span>10.29</span> <a href="http://typecho.org/archives/135/" target="_blank">Typecho 1.1(17.10.30) 正式版发布</a></li><li><span>10.26</span> <a href="http://typecho.org/archives/133/" target="_blank">Typecho 1.1(17.10.24) Beta版发布</a></li><li><span>8.21</span> <a href="http://typecho.org/archives/132/" target="_blank">一次关于Typecho的分享</a></li><li><span>10.14</span> <a href="http://typecho.org/archives/128/" target="_blank">参与下一个版本开发方向的投票</a></li><li><span>10.11</span> <a href="http://typecho.org/archives/126/" target="_blank">Typecho 1.0 (14.10.10) 修正版发布</a></li><li><span>10.9</span> <a href="http://typecho.org/archives/125/" target="_blank">Typecho 1.0 正式版发布</a></li><li><span>5.27</span> <a href="http://typecho.org/archives/124/" target="_blank">Typecho 1.0测试版发布</a></li><li><span>2.25</span> <a href="http://typecho.org/archives/121/" target="_blank">Typecho新特性，多级分类支持</a></li><li><span>12.12</span> <a href="http://typecho.org/archives/111/" target="_blank">Typecho 0.9(13.12.12) 修正版发布</a></li><li><span>12.10</span> <a href="http://typecho.org/archives/109/" target="_blank">Typecho 0.9 正式版发布</a></li></ul>
                </vk-card>
              </div>
            </vk-grid>
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
