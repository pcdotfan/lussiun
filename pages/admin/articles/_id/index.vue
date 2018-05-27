<template>
  <main class="uk-container uk-container-small uk-margin-top">
    <div class="article-new-edit">
        <vk-card>
          <div slot="header">
            <input class="title uk-input uk-width-1-1 uk-form-large" v-model="article.title">
          </div>
          <div>
            <markdown-editor v-model="article.content"></markdown-editor>
          </div>
          <div slot="footer">
            <p class="uk-text-right">
              <vk-button type="primary" @click="updateArticle()">更新文章</vk-button>
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
      article: {},
      topicsSelected: [],
      topics: [],
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
      return this.$axios.$get('/categories')
    }
  },
  methods: {
    async updateArticle () {
      await this.$axios.$patch('/articles', this.article)
        .then(response => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success'
          })
        }).catch(() => {
          this.$notify({
            title: '失败',
            message: '出现内部错误',
            type: 'warning'
          })
        })
    }
  },
  async mounted () {
    this.$store.commit('changeHero', {
      title: '编辑文章',
      description: '词源倒流三江水，笔阵独扫千人军。',
      navbarItems: [
        { title: '文章列表', path: '/admin/articles' },
        { title: '撰写文章', path: '/admin/articles/new' },
        { title: '编辑文章', path: this.$route.path }
      ]
    })
    this.topics = await this.$axios.$get('/topics')
    this.article = await this.$axios.$get(`/articles/${this.$route.params.id}`)
  }
}
</script>
