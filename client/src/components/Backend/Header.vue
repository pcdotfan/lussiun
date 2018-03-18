<template>
  <div class="master">
    <header class="cd-main-header">
      <a href="#" class="cd-logo">
      ExpressPixel
    </a>
      <div class="cd-search is-hidden">
        <form action="#0">
          <input type="search" placeholder="Search...">
        </form>
      </div>
      <!-- cd-search -->
      <a href="#" class="cd-nav-trigger"><span></span></a>
      <nav class="cd-nav">
        <ul class="cd-top-nav">
          <li><a href="#events/calendar">Tour</a></li>
          <li><a href="#articles/comments">Support</a></li>
          <li class="has-children account">
            <a href="#">
            <img src="img/cd-avatar.png" alt="avatar">
            Account
          </a>
            <ul>
              <li><a href="#">My Account</a></li>
              <li><a href="#">Edit Account</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {}
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
