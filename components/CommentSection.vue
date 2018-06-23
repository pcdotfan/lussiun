<template>
<section id="comments">
</section>
</template>

<script>
const Valine = require('valine')

export default {
  name: 'CommentSection',
  props: ['article'],
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  async mounted () {
    let valine = new Valine({
      el: '#comments',
      appId: 'K00LQAmEbHUTw3N9LvKnWj3v-gzGzoHsz',
      appKey: 'Ezun7ldkH4uLnBTJDRBXYLRb'
    })
    valine.el = '#comments'
  }
}
</script>

<style>

</style>
