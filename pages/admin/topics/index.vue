<template>
    <main class="uk-container uk-container-medium uk-margin">
        <vk-grid>
          <div class="uk-width-3-5">
            <div class="uk-card uk-card-default">
              <table class="uk-table uk-table-divider">
                <thead>
                  <tr>
                    <th class="uk-width-expand">话题名称</th>
                    <th class="uk-table-shrink uk-text-nowrap">别名</th>
                    <th class="uk-table-shrink uk-text-nowrap">总数</th>
                    <th class="uk-width-small">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="topic in topics" :key="topic.id">
                    <td v-text="topic.name"></td>
                    <td v-text="topic.slug"></td>
                    <td>{{ topic.id }}</td>
                    <td>
                      <vk-iconnav>
                        <vk-iconnav-item href="#" icon="file-edit"></vk-iconnav-item>
                        <vk-iconnav-item @click="destoryTopic(topic.id)" icon="trash"></vk-iconnav-item>
                      </vk-iconnav>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="uk-width-2-5">
            <vk-card padding="small">
              <div slot="header">
                <h4>创建新话题</h4>
              </div>
              <form class="uk-form-stacked">
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">话题名称</label>
                  <div class="uk-form-controls">
                    <input class="uk-input" id="form-stacked-text" type="text" v-model="topic.name">
                  </div>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">别名</label>
                  <div class="uk-form-controls">
                    <input class="uk-input" id="form-stacked-text" type="text" v-model="topic.slug">
                  </div>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">描述（可选）</label>
                  <div class="uk-form-controls">
                    <textarea class="uk-textarea" v-model="topic.description"></textarea>
                  </div>
                </div>
              </form>
              <div slot="footer">
                <p class="uk-text-right">
                  <button type="submit" @click="addTopic()" class="uk-button uk-button-primary">发布话题</button>
                </p>
              </div>
            </vk-card>
          </div>
        </vk-grid>
      </main>
</template>
<script>
export default {
  name: 'TopicsIndex',
  layout: 'backend',
  data () {
    return {
      refetch: false,
      topic: {
        name: '',
        slug: '',
        description: ''
      }
    }
  },
  asyncComputed: {
    topics: {
      async get () {
        return this.$axios.$get('/topics')
      },
      watch () {
        return this.refetch
      }
    }
  },
  async mounted () {
    this.refetch = !this.refetch
    this.$store.commit('changeHero', {
      title: '话题',
      description: '瞻彼淇奥，绿竹猗猗。'
    })
  },
  methods: {
    async addTopic () {
      return this.$axios.$post('/topics', this.topic)
      .then(response => {
        this.refetch = !this.refetch
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success'
        })
      }).catch(() => {
        // error 待处理
        this.$notify({
          title: '失败',
          message: '出现内部错误',
          type: 'warning'
        })
      })
    },
    async destoryTopic (id) {
      this.$confirm('此操作将永久删除该目录以及目录下所有文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.$delete('/topics', {
          id: id
        }).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.refetch = !this.refetch
          console.log(response)
        }).catch(error => {
          console.log(error)
          this.$message({
            message: '出现内部错误',
            type: 'warning'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
