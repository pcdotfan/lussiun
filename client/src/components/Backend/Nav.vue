<template>
  <nav class="cd-side-nav">
    <ul class="uk-nav uk-nav-default">
      <li class="cd-label">Main</li>
      <li class="has-children overview">
        <a href="#">Articles</a>
        <ul>
          <li><a href="#articles/new">Write a new article</a></li>
          <li><a href="#articles/manage">Manage Articles</a></li>
          <li><a href="#articles/comments">Manage Comments</a></li>
          <li><a href="#articles/categories">Manage Categories</a></li>
        </ul>
      </li>
      <li class="has-children notifications active">
        <a href="#">Images</a>
        <ul>
          <li><a href="#images/upload">Upload images</a></li>
          <li><a href="#images/gallery">Manage galleries</a></li>
          <li><a href="#images/albums">Manage albums</a></li>
          <li><a href="#images/settings">Gallery settings</a></li>
        </ul>
      </li>
      <li class="has-children comments">
        <a href="#">Widgets</a>
        <ul>
          <li><a href="#widgets/tabs">Tabs</a></li>
          <li><a href="#widgets/carousel">Carousel</a></li>
          <li><a href="#widgets/modals">Modals</a></li>
          <li><a href="#widgets/popups">Confirm boxes</a></li>
          <li><a href="#widgets/charts">Charts</a></li>
        </ul>
      </li>
    </ul>
    <ul>
      <li class="cd-label">Events</li>
      <li class="has-children bookmarks">
        <a href="#">Calendar</a>
        <ul>
          <li><a href="#events/calendar">Calendar overview</a></li>
          <li><a href="#events/event">Add a new event</a></li>
          <li><a href="#events/appointments">Appointments</a></li>
        </ul>
      </li>
      <li class="has-children images">
        <a href="#">Elements</a>
        <ul>
          <li><a href="#elements/buttons">Buttons</a></li>
          <li><a href="#elements/badges">Labels & Badges</a></li>
          <li><a href="#elements/cards">Cards and panels</a></li>
          <li><a href="#elements/icons">Icons</a></li>
          <li><a href="#elements/navs">Navigation menus</a></li>
          <li><a href="#elements/alerts">Alerts</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'Nav',
  data () {
    return {}
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
