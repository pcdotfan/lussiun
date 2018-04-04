<template>
  <div id="backend">
    <DHeader></DHeader>
    <DHero></DHero>
    <slot></slot>
  </div>
</template>
<script>
import Header from '@/components/backend/Header'
import Hero from '@/components/backend/Hero'
export default {
  name: 'Backend',
  components: {
    'DHeader': Header,
    'DHero': Hero
  },
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
