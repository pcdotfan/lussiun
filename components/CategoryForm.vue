<template>
<div>
    <vk-card padding="small">
        <div slot="header">
          <h4 v-if="!idCopied">创建新分类</h4>
          <h4 v-else>编辑分类</h4>
        </div>
        <form class="uk-form-stacked">
          <div class="uk-margin">
              <label class="uk-form-label" for="name">分类名称</label>
              <div class="uk-form-controls">
                <input class="uk-input" v-validate="'required'" name="name" type="text" v-model="category.name">
              </div>
          </div>
          <div class="uk-margin">
              <label class="uk-form-label" for="slug">别名</label>
              <div class="uk-form-controls">
                <input class="uk-input" v-validate="'required|alpha_dash'" name="slug" type="text" v-model="category.slug">
              </div>
          </div>
          <div class="uk-margin">
              <label class="uk-form-label" for="description">描述（可选）</label>
              <div class="uk-form-controls">
                <textarea class="uk-textarea" name="description" v-model="category.description"></textarea>
              </div>
          </div>
        </form>
        <div slot="footer">
          <p class="uk-text-right" v-if="!idCopied">
            <vk-button type="primary" @click="addCategory">发布分类</vk-button>
          </p>
          <p class="uk-text-right" v-else>
            <vk-button type="secondary" @click="back">返回</vk-button>
            <vk-button class="uk-margin-small-left" type="primary" @click="updateCategory">更新分类</vk-button>
          </p>
        </div>
    </vk-card>
</div>
</template>
<script>
export default {
  name: 'CategoryForm',
  props: {
    id: {
      type: Number
    }
  },
  data () {
    return {
      category: {
        name: '',
        slug: '',
        description: ''
      },
      idCopied: this.id
    }
  },
  methods: {
    back () {
      this.idCopied = 0
      this.category = {}
    },
    async addCategory () {
      if (this.errors.items.length !== 0) {
        this.$message({
          message: this.errors.items[0].msg,
          type: 'warning'
        })
        return
      }
      return this.$axios.$post('/categories', this.category)
      .then(response => {
        this.$emit('refresh-event')
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success'
        })
      }).catch(e => {
        this.$notify({
          title: '失败',
          message: e.data.message,
          type: 'warning'
        })
      })
    },
    async updateCategory () {
      if (this.errors.items.length !== 0) {
        this.$message({
          message: this.errors.items[0].msg,
          type: 'warning'
        })
        return
      }
      return this.$axios.$patch(`/categories/${this.id}`, this.category)
      .then(response => {
        this.$emit('refresh-event')
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success'
        })
      }).catch(e => {
        this.$notify({
          title: '失败',
          message: e.data.message,
          type: 'warning'
        })
      })
    }
  },
  watch: {
    async id (val) {
      this.idCopied = this.id
      if (val !== 0) {
        this.category = await this.$axios.$get(`/categories/${this.idCopied}`)
      }
    }
  }
}
</script>
