<template>
  <main class="uk-container uk-container-small uk-margin-top">
    <div class="article-new-edit">
        <vk-card>
          <div slot="header">
            <input class="title uk-input uk-width-1-1 uk-form-large" placeholder="输入标题..." v-model="article.title">
          </div>
          <div>
            <markdown-editor v-model="article.content"></markdown-editor>
          </div>
          <div slot="footer">
            <p class="uk-text-right">
              <vk-button @click="createArticle()" type="primary">发布文章</vk-button>
            </p>
          </div>
        </vk-card>
        <section class="article-new-edit-controls">
          <vk-card class="uk-margin">
            <vk-grid class="uk-child-width-1-3" divided>
              <div>
                <label class="uk-form-label" for="slug">别名</label>
                <input class="uk-input" type="text" name="slug" v-model="article.slug">
              </div>
              <div>
                <label class="uk-form-label" for="status">状态</label>
                <el-select v-model="article.status" name="status" placeholder="选择文章状态">
                  <el-option
                    v-for="status in statuses"
                    :key="status.id"
                    :label="status.name"
                    :value="status.id">
                  </el-option>
                </el-select>
              </div>
              <div>
                <label class="uk-form-label" for="categories">分类目录</label>
                <el-select v-model="article.categoryId" placeholder="选择一个分类目录">
                  <el-option
                    v-for="category in categories"
                    :key="category.id"
                    :label="category.name"
                    :value="category.id">
                  </el-option>
                </el-select>
              </div>
            </vk-grid>
          </vk-card>
          <vk-card class="uk-margin">
            <vk-grid class="uk-child-width-1-2" divided>
              <div>
                <label class="uk-form-label" for="createdAt">发布时间</label>
                <el-date-picker
                  type="datetime"
                  name="createdAt"
                  class="uk-width-1-1"
                  v-model="article.createdAt"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
              <div>
                <label class="uk-form-label" for="topics">文章话题</label>
                <el-select
                    v-model="article.topics"
                    name="topics"
                    class="uk-width-1-1"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择文章话题">
                    <el-option
                      v-for="topic in topics"
                      :key="topic.id"
                      :label="topic.name"
                      :value="topic.id">
                    </el-option>
                  </el-select>
              </div>
            </vk-grid>
          </vk-card>
        </section>
      </div>
  </main>
</template>
<script>
export default {
  name: 'New',
  layout: 'backend',
  data () {
    return {
      article: {
        categoryId: '请选择',
        status: 1,
        content: '',
        slug: '',
        topics: [],
        createdAt: new Date()
      },
      statuses: [
        {
          id: -1,
          name: '已删除'
        },
        {
          id: 0,
          name: '草稿'
        },
        {
          id: 1,
          name: '待审核'
        },
        {
          id: 2,
          name: '已发布'
        }
      ]
    }
  },
  asyncComputed: {
    async categories () {
      const categories = await this.$axios.$get('/categories')
      this.article.category = categories[0].id

      return categories
    }
  },
  methods: {
    async createArticle () {
      await this.$axios.$post('/articles', this.article)
        .then(response => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success'
          })
        }).catch(error => {
          console.log(error)
          this.$notify({
            title: '失败',
            message: '出现内部错误',
            type: 'warning'
          })
        })
    }
  },
  async mounted () {
    this.topics = await this.$axios.$get('/topics')
    this.$store.commit('changeHero', {
      title: '撰写文章',
      description: '词源倒流三江水，笔阵独扫千人军。',
      navbarItems: [
        { title: '文章列表', path: '/admin/articles' },
        { title: '撰写文章', path: '/admin/articles/new' }
      ]
    })
  }
}
</script>
