<template>
    <main class="uk-container uk-margin-top">
        <div class="uk-grid-medium" uk-grid>
            <div class="uk-width-1-4@m uk-width-1-1">
              <div class="overview-sidebar uk-card uk-card-default uk-card-small uk-card-body">
                  <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
                      <li @click="changeStatus(2)" :class="{ 'uk-active': isActive(2) }"><a><span class="uk-margin-right" uk-icon="icon: table"></span> 已发布</a></li>
                      <li @click="changeStatus(1)" :class="{ 'uk-active': isActive(1) }"><a><span class="uk-margin-right" uk-icon="icon: thumbnails"></span> 待审核</a></li>
                      <li @click="changeStatus(0)" :class="{ 'uk-active': isActive(0) }"><a ><span class="uk-margin-right" uk-icon="icon: thumbnails"></span> 草稿</a></li>
                      <li @click="changeStatus(-1)" :class="{ 'uk-active': isActive(-1) }"><a><span class="uk-margin-right" uk-icon="icon: trash"></span> 回收站</a></li>
                  </ul>
              </div>
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
                      <td v-text="article.title"></td>
                      <td class="uk-table-shrink uk-text-nowrap uk-text-small"><img class="uk-preserve-width uk-border-circle" :src="Gravatar.url(user(article.userId).email, { s: '40' })" width="40">{{ user(article.userId).name }}</td>
                      <td class="uk-table-shrink uk-text-nowrap uk-text-small">WordPress</td>
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
        </div>
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
    async user (id) {
      const user = await this.$axios.$get(`/user/${id}`)
      return user
    },
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
