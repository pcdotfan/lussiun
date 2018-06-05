<template>
    <div v-if="$auth.$state.busy" v-loading.fullscreen.lock="fullscreenLoading"></div>
</template>

<script>
  export default {
    data () {
      return {
        fullscreenLoading: true
      }
    }
  }
</script>
