<template>
    <div :class="getAlertType" v-if="isOpen" uk-alert>
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
  name: 'AuthTip',
  data() {
    return {
      message: '',
      isOpen: false,
      type: ''
    }
  },
  computed: {
    getAlertType() {
      if (this.isOpen) {
        return `uk-alert-${this.type} uk-animation-shake`
      } else {
        return `uk-hidden`
      }
    }
  },
  methods: {
    openAlert(text, type) {
      this.isOpen = true
      this.message = text
      this.type = 'danger'
    }
  }
}
</script>

<style>

</style>
