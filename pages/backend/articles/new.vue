<template>
  <main class="uk-container uk-container-small uk-margin-top">
    <div class="article-new-edit">
        <div class="uk-card uk-card-default">
          <div class="uk-card-header">
            <input class="title uk-input uk-width-1-1 uk-form-large" placeholder="输入标题...">
          </div>
          <div class="uk-card-body">
            <Editor></Editor>
          </div>
        </div>
        <div class="article-new-edit-controls uk-margin uk-card uk-card-default uk-card-body">
          <div class="uk-grid uk-child-width-1-3 uk-grid-divider">
            <div>
              <label class="uk-form-label" for="published-date">发布时间</label>
              <el-date-picker
                v-model="value1"
                type="datetime"
                name="published-date"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
            <div>
              <label class="uk-form-label" for="tags">文章标签</label>
              <el-select
                name="tags"
                v-model="value10"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择文章标签">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <label class="uk-form-label" for="categories">分类目录</label>
              <select class="uk-select" name="categories">
                  <option>Option 01</option>
                  <option>Option 02</option>
              </select>
            </div>
          </div>
        </div>
      </div>
  </main>
</template>
<script>
import Editor from '~/components/MarkdownEditor'
export default {
  middleware: 'auth',
  name: 'New',
  layout: 'backend',
  components: {
    Editor
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$store.commit('changeHero', {
      heroTitle: '撰写文章',
      heroDescription: '词源倒流三江水，笔阵独扫千人军。',
      heroNavbarItems: [
        { title: '文章列表', path: '/backend/articles' },
        { title: '撰写文章', path: '/backend/articles/new' }
      ]
    })
  }
}
</script>
