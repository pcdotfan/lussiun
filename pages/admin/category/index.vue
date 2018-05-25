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
                  <tr v-for="category in categories" :key="category.id">
                    <td v-text="category.name"></td>
                    <td v-text="category.slug"></td>
                    <td>{{ category.id }}</td>
                    <td>
                      <button class="uk-button uk-button-danger" type="button" @click="destoryCategory(category.id)">删除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="uk-width-2-5">
            <vk-card padding="small">
              <div slot="header">
                <h4>创建新分类</h4>
              </div>
              <form class="uk-form-stacked">
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">分类名称</label>
                  <div class="uk-form-controls">
                    <input class="uk-input" id="form-stacked-text" type="text" v-model="newCategory.name">
                  </div>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">别名</label>
                  <div class="uk-form-controls">
                    <input class="uk-input" id="form-stacked-text" type="text" v-model="newCategory.slug">
                  </div>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">描述（可选）</label>
                  <div class="uk-form-controls">
                    <textarea class="uk-textarea" v-model="newCategory.description"></textarea>
                  </div>
                </div>
              </form>
              <div slot="footer">
                <p class="uk-text-right">
                  <button type="submit" class="uk-button uk-button-primary" @click="addCategory()">发布话题</button>
                </p>
              </div>
            </vk-card>
          </div>
        </vk-grid>
      </main>
</template>
<script>
export default {
  name: 'CategoryIndex',
  layout: 'backend',
  data () {
    return {
      refetch: false,
      newCategory: {
        name: '',
        slug: '',
        description: ''
      }
    }
  },
  asyncComputed: {
    categories: {
      async get () {
        return this.$axios.$get('/categories')
      },
      watch () {
        return this.refetch
      }
    }
  },
  mounted () {
    this.$store.commit('changeHero', {
      title: '分类目录',
      description: '留连戏蝶时时舞，自在娇莺恰恰啼。'
    })
  },
  methods: {
    async addCategory () {
      return this.$axios.$post('/categories/store', this.newCategory)
      .then(response => {
        this.refetch = !this.refetch
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
    },
    async destoryCategory (id) {
      this.$confirm('此操作将永久删除该目录以及目录下所有文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.$post('/categories/destroy', {
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
