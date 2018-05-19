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
                type="datetime"
                name="published-date"
                v-model="published_date"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
            <div>
              <label class="uk-form-label" for="tags">文章标签</label>
            </div>
            <div>
              <label class="uk-form-label" for="categories">分类目录</label>
              <el-select v-model="value" placeholder="选择一个分类目录">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
  </main>
</template>
<script>
import Editor from '~/components/MarkdownEditor'
export default {
  name: 'New',
  layout: 'backend',
  components: {
    Editor
  },
  data () {
    return {
      published_date: new Date()
    }
  },
  asyncComputed: {
    async categories () {
      return this.$axios.$get('/api/category/index')
    }
  },
  mounted () {
    this.listCategories()
    this.$store.commit('changeHero', {
      title: '撰写文章',
      description: '词源倒流三江水，笔阵独扫千人军。',
      navbarItems: [
        { title: '文章列表', path: '/backend/articles' },
        { title: '撰写文章', path: '/backend/articles/new' }
      ]
    })
  },
  methods: {
    async listCategories () {
      this.categories = await this.$axios.$get('/api/category/index')
    }
  }
}
</script>
