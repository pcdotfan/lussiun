<template>
  <main class="uk-container uk-container-small uk-margin-top">
    <div class="article-new-edit">
        <vk-card>
          <div slot="header">
            <input class="title uk-input uk-width-1-1 uk-form-large" v-validate="'required'" data-vv-as="标题" v-model="article.title">
          </div>
          <div>
            <markdown-editor v-model="article.content" v-validate="'required'" data-vv-as="内容"></markdown-editor>
          </div>
          <div slot="footer">
            <p class="uk-text-right">
              <vk-button type="primary" @click="updateArticle">更新文章</vk-button>
            </p>
          </div>
        </vk-card>
        <section class="article-new-edit-controls">
          <vk-card class="uk-margin">
            <vk-grid class="uk-child-width-1-3" divided>
              <div>
                <label class="uk-form-label" for="slug">别名</label>
                <input class="uk-input" type="text" v-validate="'required|alpha_dash'" data-vv-as="别名" name="slug" v-model="article.slug">
              </div>
              <div>
                <label class="uk-form-label" for="status">状态</label>
                <el-select v-model="article.status"  v-validate="'required|min:-1|max:2'" data-vv-as="状态" name="status" placeholder="选择文章状态">
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
                <el-select v-model="article.categoryId" v-validate="'required|numeric'" placeholder="选择一个分类目录">
                  <el-option
                    v-for="category in categories"
                    :key="category.id"
                    :label="category.name"
                    :value="category.id">
                  </el-option>
                </el-select>
              </div>
              <div>
                <label class="uk-form-label" for="updatedAt">更新时间</label>
                <el-date-picker
                  v-model="updatedAt"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
              <div>
                <label class="uk-form-label" for="categories">杂项</label>
                <label><input class="uk-checkbox uk-margin-small-right" type="checkbox" checked>开启评论</label>
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
  head () {
    return {
      title: this.article.title + ' | ' + this.$nuxt.$options.head.title
    }
  },
  data () {
    return {
      article: {
        title: '',
        slug: '',
        content: '',
        categoryId: '请选择',
        status: 2
      },
      updatedAt: new Date(),
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
    categories: {
      get () {
        return this.$axios.$get('/categories')
      },
      default () {
        return []
      }
    }
  },
  methods: {
    async updateArticle () {
      if (this.errors.items.length !== 0) {
        return this.$message.warning(this.errors.items[0].msg)
      }
      return this.$axios.$patch(`/articles/${this.article.id}`, this.article)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '操作成功'
          })
        }).catch(e => {
          this.$notify.warning({
            title: '失败',
            message: e.data.message || '内部服务器错误'
          })
        })
    }
  },
  async mounted () {
    this.$store.commit('changeHero', {
      title: '编辑文章',
      description: '词源倒流三江水，笔阵独扫千人军。',
      navbarItems: [
        { title: '文章列表', path: '/articles' },
        { title: '撰写文章', path: '/articles/new' },
        { title: '编辑文章', path: this.$route.path }
      ]
    })
    this.article = await this.$axios.$get(`/articles/${this.$route.params.id}`)
  }
}
</script>
