<template>
    <main class="uk-container uk-margin-top">
        <vk-grid>
            <div class="uk-width-1-4@m uk-width-1-1">
              <vk-card padding="small" class="overview-sidebar">
                  <vk-nav>
                      <li @click="changeStatus(2)" :class="{ 'uk-active': isActive(2) }"><a><vk-icon class="uk-margin-right" icon="pencil"></vk-icon> 已发布</a></li>
                      <li @click="changeStatus(1)" :class="{ 'uk-active': isActive(1) }"><a><vk-icon class="uk-margin-right" icon="future"></vk-icon> 待审核</a></li>
                      <li @click="changeStatus(0)" :class="{ 'uk-active': isActive(0) }"><a ><vk-icon class="uk-margin-right" icon="hashtag"></vk-icon> 草稿</a></li>
                      <li @click="changeStatus(-1)" :class="{ 'uk-active': isActive(-1) }"><a><vk-icon class="uk-margin-right" icon="trash"></vk-icon> 回收站</a></li>
                  </vk-nav>
              </vk-card>
            </div>
            <div class="uk-width-3-4@m uk-width-1-1">
              <div class="articles-list uk-card uk-card-default uk-card-small">
                <table class="uk-table uk-table-hover uk-table-middle uk-table-divider">
                  <thead>
                    <tr>
                      <th class="uk-table-shrink"><input class="uk-checkbox" type="checkbox"></th>
                      <th>标题</th>
                      <th>作者</th>
                      <th>分类目录</th>
                      <th>发布时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="article in articles" :key="article.id">
                      <td>
                        <input class="uk-checkbox" type="checkbox">
                      </td>
                      <td>
                        <router-link :to="{ name: 'admin-articles-id', params: { id: article.id } }">{{ article.title }}</router-link>
                      </td>
                      <td class="uk-table-shrink uk-text-nowrap uk-text-small"><img class="uk-margin-small-right uk-preserve-width uk-border-circle" :src="article.user.avatar" width="40">{{ article.user.nickname }}</td>
                      <td class="uk-table-shrink uk-text-nowrap uk-text-small" v-text="article.category.name"></td>
                      <td class="uk-table-shrink uk-text-nowrap uk-text-small" v-text="updatedAt(article.updatedAt)"></td>
                    </tr>
                  </tbody>
                </table>
                <div class="uk-card-footer">
                  <p class="uk-text-right">
                    <button class="uk-button uk-button-danger">删除</button>
                  </p>
                </div>
              </div>
            </div>
        </vk-grid>
    </main>
</template>
<script>
import * as moment from 'moment'
export default {
  name: 'ArticlesIndex',
  layout: 'backend',
  data () {
    return {
      status: 0
    }
  },
  methods: {
    updatedAt (date) {
      let currentDate = moment(date)
      return currentDate.format('YYYY-MM-DD')
    },
    changeStatus (s) {
      this.status = s
      this.setActiveItem(this.status)
    },
    isActive (s) {
      return s === this.status
    }
  },
  asyncComputed: {
    articles () {
      return this.$axios.$get(`/articles/?status=${this.status}`)
    }
  },
  mounted () {
    this.$store.commit('changeHero', {
      title: '文章',
      description: '屈平词赋悬日月，楚王台谢空山丘。',
      navbarItems: [
        { title: '文章列表', path: '/admin/articles' },
        { title: '撰写文章', path: '/admin/articles/new' }
      ]
    })
  }
}
</script>
