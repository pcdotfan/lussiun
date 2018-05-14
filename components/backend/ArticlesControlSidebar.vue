<template>
  <div id="backend">
    <div class="overview-sidebar uk-card uk-card-default uk-card-small uk-card-body">
        <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
            <li class="uk-active"><a href="#"><span class="uk-margin-right" uk-icon="icon: table"></span> 已发布</a></li>
            <li><a href="#"><span class="uk-margin-right" uk-icon="icon: thumbnails"></span> 待审核</a></li>
            <li><a href="#"><span class="uk-margin-right" uk-icon="icon: thumbnails"></span> 草稿</a></li>
            <li><a href="#"><span class="uk-margin-right" uk-icon="icon: trash"></span> 回收站</a></li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArticlesControlSidebar',
  components: {
  },
  data() {
    return {
    }
  }
}
</script>
