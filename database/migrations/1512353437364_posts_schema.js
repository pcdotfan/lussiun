'use strict'

const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('user_id')
      table.integer('category_id').default(1)
      table.string('title')
      table.text('excerpt')
      table.text('body')
      table.string('image').nullable()
      table.string('slug').unique()
      table.enum('status', ['PUBLISHED', 'DRAFT', 'PENDING']).default('DRAFT')
      table.boolean('featured').default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
