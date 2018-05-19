<template>
  <div>
    <markdown-editor ref="markdownEditor"></markdown-editor>
  </div>
</template>
<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
export default {
  name: 'Editor',
  components: {
    markdownEditor
  },
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>
