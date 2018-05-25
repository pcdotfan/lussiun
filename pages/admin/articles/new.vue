<template>
  <main class="uk-container uk-container-small uk-margin-top">
    <div class="article-new-edit">
        <vk-card>
          <div slot="header">
            <input class="title uk-input uk-width-1-1 uk-form-large" placeholder="输入标题...">
          </div>
          <div>
            <markdown-editor v-model="content"></markdown-editor>
          </div>
          <div slot="footer">
            <p class="uk-text-right">
              <button class="uk-button uk-button-secondary uk-margin-right">保存草稿</button>
              <button class="uk-button uk-button-primary">发布文章</button>
            </p>
          </div>
        </vk-card>
        <section class="article-new-edit-controls">
          <vk-card class="uk-margin">
            <vk-grid class="uk-child-width-1-3" divided>
              <div>
                <label class="uk-form-label" for="slug">别名</label>
                <input class="uk-input" type="text" name="slug" v-model="slug">
              </div>
              <div>
                <label class="uk-form-label" for="status">状态</label>
                <el-select v-model="statusSelected" name="status" placeholder="选择文章状态">
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
                <el-select v-model="categorySelected" placeholder="选择一个分类目录">
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
                <label class="uk-form-label" for="published-date">发布时间</label>
                <el-date-picker
                  type="datetime"
                  name="published-date"
                  class="uk-width-1-1"
                  v-model="publishedDate"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
              <div>
                <label class="uk-form-label" for="topics">文章话题</label>
                <el-select
                    v-model="topicSelected"
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
      publishedDate: new Date(),
      categorySelected: '请选择',
      statusSelected: '请选择',
      topicSelected: [],
      content: '',
      slug: '',
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
          id: -1,
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
  mounted () {
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
