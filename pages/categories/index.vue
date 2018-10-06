<template>
    <main class="uk-container uk-container-medium uk-margin">
        <vk-grid>
          <div class="uk-width-3-5">
            <div class="uk-card uk-card-default">
              <table class="uk-table uk-table-divider">
                <thead>
                  <tr>
                    <th class="uk-width-1-2">分类名称</th>
                    <th class="uk-width-1-6 uk-text-nowrap">总数</th>
                    <th class="uk-width-1-6 uk-text-nowrap">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="category in categories" :key="category.id">
                    <td v-text="category.name"></td>
                    <td v-text="category.count"></td>
                    <td>
                      <vk-iconnav>
                        <vk-iconnav-item @click="editCategory(category.id)" icon="file-edit"></vk-iconnav-item>
                        <vk-iconnav-item @click="destoryCategory(category.id)" icon="trash"></vk-iconnav-item>
                      </vk-iconnav>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="uk-width-2-5">
            <category-form @refresh-event="refresh" :id="editId"></category-form>
          </div>
        </vk-grid>
      </main>
</template>
<script>
import CategoryForm from '@/components/CategoryForm'
export default {
  name: 'CategoryIndex',
  layout: 'backend',
  components: {
    CategoryForm
  },
  data () {
    return {
      refetch: false,
      editId: 0
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
    refresh () {
      this.refetch = !this.refetch
    },
    editCategory (id) {
      this.editId = id
    },
    async destoryCategory (id) {
      this.$confirm('此操作不可逆, 是否继续？', '警告', {
        type: 'warning'
      })
        .then(() => {
          this.$axios.$delete(`/categories/${id}`)
            .then(response => {
              this.$message.success('操作成功')
              this.refetch = !this.refetch
            })
            .catch(e => {
              this.$message.warning(e.data.message)
            })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  }
}
</script>
