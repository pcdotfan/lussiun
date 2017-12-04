<template>
  <div>
    <!-- 通过 v-model 控制 value -->
    <markdown-editor ref="markdownEditor" v-model="textareaContent" @input="handleInput"></markdown-editor>
    <textarea :name="name" v-model="textareaContent"></textarea>
  </div>
</template>

<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>

<script>
  import markdownEditor from 'vue-simplemde/src/markdown-editor'

  // 完整示例
  export default {
    props: ['name'],
    components: {
      markdownEditor
    },
    data () {
      return {
        textareaContent: '',
        configs: {
          status: false, // 禁用底部状态栏
          spellChecker: false // 禁用拼写检查
        }
      }
    },
    computed: {
      simplemde () {
        return this.$refs.markdownEditor.simplemde
      }
    },
    mounted() {
    },
    methods: {

    }
  }
</script>
