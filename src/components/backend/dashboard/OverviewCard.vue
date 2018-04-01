<template>
  <div class="overview-card">
    <div class="uk-card uk-card-default uk-card-small">
      <div class="header uk-card-header">
        <h3 class="uk-h4 title" v-text="title"></h3>
      </div>
      <div class="content uk-card-body">
        <slot></slot>
      </div>
      <div class="footer uk-card-footer">
        <span class="uk-text-small" v-text="footer"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OverviewCard',
  props: ['title', 'footer'],
  components: {
  },
  data() {
    return {

    }
  }
}

</script>
