<template>
  <section class="hero uk-section-primary uk-preserve-color">
    <div class="uk-section uk-light">
      <div class="hero-content uk-container uk-container-medium">
        <h2 v-text="title"></h2>
        <p v-text="description"></p>
      </div>
    </div>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'DHero',
  props: ['title', 'description'],
  data() {
    return {
    }
  }
}

</script>
