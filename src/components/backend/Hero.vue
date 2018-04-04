<template>
  <section class="hero uk-section-primary uk-preserve-color">
    <div class="uk-section uk-light">
      <div class="hero-content uk-container uk-container-medium">
        <h2 v-text="heroTitle"></h2>
        <p v-text="heroDescription"></p>
      </div>
    </div>
    <nav class="hero-navbar uk-navbar-transparent uk-light" v-if="heroNavbarItems">
        <div class="uk-container uk-container-medium">
            <div uk-navbar>
                <ul class="uk-navbar-nav">
                    <router-link :to="item.path" tag="li" v-for="item in heroNavbarItems" :key="item.title"><a v-text="item.title" exact></a></router-link>
                </ul>
            </div>
        </div>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'DHero',
  data() {
    return {
    }
  },
  computed: {
    heroTitle() {
      return this.$store.state.heroTitle
    },
    heroDescription() {
      return this.$store.state.heroDescription
    },
    heroNavbarItems() {
      return this.$store.state.heroNavbarItems
    }
  }
}

</script>
