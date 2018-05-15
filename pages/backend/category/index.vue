<template>
    <main class="uk-container uk-container-medium uk-margin">
        <div class="uk-grid-medium" uk-grid>
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
                    <td>5</td>
                    <td>
                      <button class="uk-button uk-button-danger" type="button" @click="destoryCategory(category.id)">删除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="uk-width-2-5">
            <div class="uk-card uk-card-default uk-card-small">
              <div class="uk-card-header">
                <h4>创建新分类</h4>
              </div>
              <div class="uk-card-body">
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
              </div>
              <div class="uk-card-footer">
                <p class="uk-text-right">
                  <button type="submit" class="uk-button uk-button-primary" @click="addCategory()">发布话题</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
</template>
<script>
import UIkit from 'uikit'
export default {
  name: 'CategoryIndex',
  layout: 'backend',
  data() {
    return {
      newCategory: {
        name: '',
        slug: '',
        description: ''
      }
    }
  },
  asyncComputed: {
    async categories() {
      return this.$axios.$get('/api/category/index')
    },
  },
  mounted() {
    this.$store.commit('changeHero', {
      title: '分类目录',
      description: '留连戏蝶时时舞，自在娇莺恰恰啼。'
    })
  },
  methods: {
    async addCategory() {
      const result = await this.$axios.$post('/api/category/store', this.newCategory)
      .then(function (response) {
        UIkit.notification("操作成功");
        console.log('done')
      }).catch(function (error) {
        UIkit.notification("出现内部错误");
      });
    },
    async destoryCategory(id) {
      const result = await this.$axios.$post('/api/category/destroy', {
        id: id
      }).then(function (response) {
        UIkit.notification("操作成功");
        console.log(response)
      }).catch(function (error) {
        console.log(error)
        UIkit.notification("出现内部错误");
      });
    }
  }
}
</script>
