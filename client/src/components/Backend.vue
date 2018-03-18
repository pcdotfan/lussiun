<template>
  <div class="backend">
    <b-header></b-header>
    <main class="main-content">
      <b-nav></b-nav>
      <div class="content-wrapper">
        <div id="page-content-wrapper uk-margin-top">
          <div class="uk-container uk-container-medium" id="content">
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import Header from '@/components/Backend/Header.vue'
import Nav from '@/components/Backend/Nav.vue'
export default {
  name: 'Backend',
  components: {
    'b-header': Header,
    'b-nav': Nav
  },
  data () {
    return {}
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
