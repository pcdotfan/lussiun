<template>
<div>
    <vk-card padding="small">
        <div slot="header">
          <h4 v-if="!idCopied">创建新分类</h4>
          <h4 v-else>编辑分类</h4>
        </div>
        <form class="uk-form-stacked">
          <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">分类名称</label>
              <div class="uk-form-controls">
                <input class="uk-input" id="form-stacked-text" type="text" v-model="category.name">
              </div>
          </div>
          <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">别名</label>
              <div class="uk-form-controls">
                <input class="uk-input" id="form-stacked-text" type="text" v-model="category.slug">
              </div>
          </div>
          <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">描述（可选）</label>
              <div class="uk-form-controls">
                <textarea class="uk-textarea" v-model="category.description"></textarea>
              </div>
          </div>
        </form>
        <div slot="footer">
          <p class="uk-text-right" v-if="!idCopied">
            <vk-button type="primary" @click="addCategory">发布话题</vk-button>
          </p>
          <p class="uk-text-right" v-else>
            <vk-button type="secondary" @click="back">返回</vk-button>
            <vk-button class="uk-margin-small-left" type="primary" @click="updateCategory">更新话题</vk-button>
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
      category: {},
      idCopied: this.id
    }
  },
  async mounted () {
    this.category = await this.$axios.$get(`/categories/${this.id}`)
  },
  methods: {
    back () {
      this.idCopied = 0
      this.category = {}
    },
    async addCategory () {
      return this.$axios.$post('/categories', this.category)
      .then(response => {
        this.$emit('refresh-event')
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
    async updateCategory () {
      return this.$axios.$patch(`/categories/${this.id}`, this.category)
      .then(response => {
        this.$emit('refresh-event')
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
