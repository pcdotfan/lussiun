<template>
  <div id="backend">
    <div class="articles-list uk-card uk-card-default uk-card-small">
      <table class="uk-table uk-table-hover uk-table-middle uk-table-divider">
        <thead>
          <tr>
            <th class="uk-table-shrink"><input class="uk-checkbox" type="checkbox"></th>
            <th>标题</th>
            <th class="">作者</th>
            <th class="">分类目录</th>
            <th class="">发布时间</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input class="uk-checkbox" type="checkbox">
            </td>
            <td>
              SM.MS Uploader – SM.MS 图床 WordPress 插件
            </td>
            <td class="uk-table-shrink uk-text-nowrap uk-text-small"><img class="uk-preserve-width uk-border-circle" src="http://thetheme.io/theadmin/samples/support/assets/img/avatar/1.jpg" width="40" alt=""> PCDotFan</td>
            <td class="uk-table-shrink uk-text-nowrap uk-text-small">WordPress 插件</td>
            <td class="uk-table-shrink uk-text-nowrap uk-text-small">2018-03-17</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArticlesList',
  components: {},
  data() {
    return {}
  }
}
</script>
