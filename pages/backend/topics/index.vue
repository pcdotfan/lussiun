<template>
    <main class="uk-container uk-container-medium uk-margin">
        <div class="uk-grid-medium" uk-grid>
          <div class="uk-width-3-5">
            <div class="uk-card uk-card-default">
              <table class="uk-table uk-table-divider">
                <thead>
                  <tr>
                    <th class="uk-width-expand">话题名称</th>
                    <th class="uk-table-shrink uk-text-nowrap">总数</th>
                    <th class="uk-width-small">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                    <td>4</td>
                    <td>
                      <button class="uk-button uk-button-default" type="button">Button</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                    <td>5</td>
                    <td>
                      <button class="uk-button uk-button-default" type="button">Button</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="uk-width-2-5">
            <div class="uk-card uk-card-default uk-card-small">
              <div class="uk-card-header">
                <h4>创建新话题</h4>
              </div>
              <div class="uk-card-body">
                <form class="uk-form-stacked">
                  <div class="uk-margin">
                    <label class="uk-form-label" for="form-stacked-text">话题名称</label>
                    <div class="uk-form-controls">
                      <input class="uk-input" id="form-stacked-text" type="text">
                    </div>
                  </div>
                  <div class="uk-margin">
                    <label class="uk-form-label" for="form-stacked-text">别名</label>
                    <div class="uk-form-controls">
                      <input class="uk-input" id="form-stacked-text" type="text">
                    </div>
                  </div>
                  <div class="uk-margin">
                    <label class="uk-form-label" for="form-stacked-text">描述（可选）</label>
                    <div class="uk-form-controls">
                      <textarea class="uk-textarea"></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div class="uk-card-footer">
                <p class="uk-text-right">
                  <button type="submit" class="uk-button uk-button-primary">发布话题</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
</template>
<script>
export default {
  name: 'TopicsIndex',
  layout: 'backend',
  data() {
    return {
    }
  },
  mounted() {
    this.$store.commit('changeHero', {
      heroTitle: '话题',
      heroDescription: '瞻彼淇奥，绿竹猗猗。'
    })
  }
}
</script>
