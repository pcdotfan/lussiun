<template>
<div>
    <vk-card padding="small">
        <div slot="header">
          <h4 v-if="!idCopied">创建新话题</h4>
          <h4 v-else>编辑话题</h4>
        </div>
        <form class="uk-form-stacked">
          <div class="uk-margin">
              <label class="uk-form-label" for="name">话题名称</label>
              <div class="uk-form-controls">
                <input class="uk-input" name="name" type="text" v-model="topic.name">
              </div>
          </div>
          <div class="uk-margin">
              <label class="uk-form-label" for="slug">别名</label>
              <div class="uk-form-controls">
                <input class="uk-input" name="slug" type="text" v-model="topic.slug">
              </div>
          </div>
          <div class="uk-margin">
              <label class="uk-form-label" for="description">描述（可选）</label>
              <div class="uk-form-controls">
                <textarea class="uk-textarea" name="description" v-model="topic.description"></textarea>
              </div>
          </div>
        </form>
        <div slot="footer">
          <p class="uk-text-right" v-if="!idCopied">
            <vk-button type="primary" @click="addTopic">发布话题</vk-button>
          </p>
          <p class="uk-text-right" v-else>
            <vk-button type="secondary" @click="back">返回</vk-button>
            <vk-button class="uk-margin-small-left" type="primary" @click="updateTopic">更新话题</vk-button>
          </p>
        </div>
    </vk-card>
</div>
</template>
<script>
export default {
  name: 'TopicForm',
  props: {
    id: {
      type: Number
    }
  },
  data () {
    return {
      topic: {},
      idCopied: this.id
    }
  },
  methods: {
    back () {
      this.idCopied = 0
      this.topic = {}
    },
    async addTopic () {
      return this.$axios.$post('/topics', this.topic)
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
    async updateTopic () {
      return this.$axios.$patch(`/topics/${this.id}`, this.topic)
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
        this.topic = await this.$axios.$get(`/topics/${this.idCopied}`)
      }
    }
  }
}
</script>
