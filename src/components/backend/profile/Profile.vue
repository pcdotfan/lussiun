<template>
  <div id="backend">
    <Backend>
      <main class="uk-container uk-container-small uk-margin">
        <div class="uk-grid-medium" uk-grid>
          <div class="uk-width-1-4">
            <div class="uk-card uk-card-default">
              <img src="https://avatars1.githubusercontent.com/u/3370745?s=460&v=4">
              <button class="uk-button uk-button-primary uk-width-1-1">更换头像</button>
            </div>
          </div>
          <div class="uk-width-3-4">
            <div class="uk-card uk-card-default">
              <div class="uk-card-header">
                <h4>账户设置</h4>
              </div>
              <div class="uk-card-body">
                <label class="uk-form-label" for="form-stacked-text">Text</label>
                <div class="uk-form-controls">
                  <input class="uk-input" id="form-stacked-text" type="text" placeholder="Some text...">
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Backend>
  </div>
</template>
<script>
import Backend from '@/components/backend/Backend'
export default {
  name: 'Profile',
  components: {
    'Backend': Backend
  },
  data() {
    return {}
  },
  mounted() {
    this.$store.commit('changeHero', {
      heroTitle: '个人资料',
      heroDescription: '从此无心爱良夜，任他明月下西楼。'
    })
  }
}

</script>
