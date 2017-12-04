'use strict'

const Schema = use('Schema')

class TopicSchema extends Schema {
  up () {
    this.create('topics', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('topics')
  }
}

module.exports = TopicSchema
