<template>
    <main class="uk-container uk-margin-top">
        <vk-grid>
            <div class="uk-width-1-4@m uk-width-1-1">
              <vk-card padding="small" class="overview-sidebar">
                  <vk-nav>
                      <li @click="changeType(1)" :class="{ 'uk-active': isActive(1) }"><a><vk-icon class="uk-margin-right" icon="future"></vk-icon> 已发布</a></li>
                      <li @click="changeType(0)" :class="{ 'uk-active': isActive(0) }"><a ><vk-icon class="uk-margin-right" icon="hashtag"></vk-icon> 待审核</a></li>
                      <li @click="changeType(-1)" :class="{ 'uk-active': isActive(-1) }"><a><vk-icon class="uk-margin-right" icon="trash"></vk-icon> 回收站</a></li>
                  </vk-nav>
              </vk-card>
            </div>
            <div class="uk-width-3-4@m uk-width-1-1">
              <div class="comments-list uk-card uk-card-default uk-card-small">
                <table class="uk-table uk-table-hover uk-table-middle uk-table-divider">
                  <thead>
                    <tr>
                      <th class="uk-table-shrink"><input class="uk-checkbox" type="checkbox" v-model="selectAll"></th>
                      <th>作者</th>
                      <th>内容</th>
                      <th>发布时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="comment in comments" :key="comment.id">
                      <td>
                        <input class="uk-checkbox" v-model="selected" :value="comment.id" type="checkbox">
                      </td>
                      <td class="uk-table-shrink uk-text-nowrap uk-text-small" style="min-width: 200px">
                        <vk-grid class="uk-flex-middle" gutter="collapse">
                          <div class="uk-width-auto">
                            <img class="uk-margin-small-right uk-preserve-width uk-border-circle" :src="comment.avatar" width="50">
                          </div>
                          <div class="uk-width-expand">
                            <p class="comment-user"><a v-text="comment.name"></a></p>
                            <div class="comment-meta">
                              <p v-text="comment.email"></p>
                              <p v-text="comment.ip"></p>
                            </div>
                          </div>
                        </vk-grid>
                      </td>
                      <td>
                        <router-link :to="{ name: 'articles-id', params: { id: comment.articleId } }">{{ comment.content }}</router-link>
                      </td>
                      <td class="uk-table-shrink uk-text-nowrap uk-text-small" v-text="getFormattedDate(comment.updateAt)"></td>
                    </tr>
                  </tbody>
                </table>
                <div class="uk-card-footer">
                  <p class="uk-text-right">
                    <button class="uk-button uk-button-danger" @click="destroy">删除</button>
                  </p>
                </div>
              </div>
              <ul class="uk-pagination">
                  <li v-show="page - 1 !== 0"><a @click="prev" class="uk-flex uk-flex-middle"><vk-icon class="uk-margin-small-right" icon="chevron-left"></vk-icon> 上一页</a></li>
                  <li v-show="nextAvailable" class="uk-margin-auto-left"><a @click="next" class="uk-flex uk-flex-middle">下一页 <vk-icon class="uk-margin-small-left" icon="chevron-right"></vk-icon></a></li>
              </ul>
            </div>
        </vk-grid>
    </main>
</template>

<style scoped>
  .comment-user {
    font-weight: bold;
    margin-bottom: 15px;
  }
  .comment-meta p {
    color: #999;
    font-size: 13px;
    margin: 3px 0;
  }
</style>

<script>
const moment = require('moment')
export default {
  name: 'commentsIndex',
  layout: 'backend',
  data () {
    return {
      type: 1,
      refetch: false,
      page: 1,
      nextAvailable: true,
      selected: [],
      comments: []
    }
  },
  methods: {
    changeType (s) {
      this.type = s
      this.page = 1
    },
    isActive (s) {
      return s === this.type
    },
    getFormattedDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    prev () {
      this.page--
    },
    async next () {
      this.page++
      const nextComments = await this.$axios.$get(`/comments/?type=${this.type}&page=${this.page + 1}`)
      if (nextComments.length === 0) {
        this.nextAvailable = false
      }
    },
    async destroy () {
      this.$confirm('此操作将永久删除所选中的所有评论, 是否继续？', '警告', {
        type: 'warning'
      })
        .then(() => {
          Promise.all(
            this.selected.map(async selection => {
              await this.$axios.$delete(`/comments/${selection}`)
                .catch(error => {
                  this.$message.warning(error.message)
                })
            })
          )
            .then(() => {
              this.refetch = !this.refetch
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
          this.$message.info('已取消操作')
        })
    }
  },
  computed: {
    selectAll: {
      get () {
        return (this.comments && this.comments.length !== 0) ? this.selected.length === this.comments.length : false
      },
      set (value) {
        let selected = []
        // 全选时
        if (value) {
          this.comments.map(comment => {
            selected.push(comment.id)
            return comment
          })
        }
        this.selected = selected
      }
    }
  },
  asyncComputed: {
    comments: {
      get () {
        return this.$axios.$get(`/comments/?type=${this.type}&page=${this.page}`)
      },
      watch () {
        return this.refetch
      }
    }
  },
  async mounted () {
    const nextComments = await this.$axios.$get(`/comments/?type=${this.type}&page=${this.page + 1}`)
    if (nextComments.length === 0) {
      this.nextAvailable = false
    }
    this.$store.commit('changeHero', {
      title: '评论',
      description: '屈平词赋悬日月，楚王台谢空山丘。',
      navbarItems: []
    })
  }
}
</script>
