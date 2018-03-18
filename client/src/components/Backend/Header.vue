<template>
  <div class="master">
    <header class="main-header">
      <vk-navbar class="uk-navbar-transparent">
        <vk-navbar-nav>
          <vk-navbar-logo>
            <a id="logo" href="/index-cn">
              <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"><img alt="Ant Design" src="https://gw.alipayobjects.com/zos/rmsportal/DkKNubTaaVsKURhcVGkh.svg">
            </a>
          </vk-navbar-logo>
          <vk-navbar-item class="search">
            <form action="javascript:void(0)">
              <div class="uk-inline uk-margin-left">
                <vk-icon icon="search" class="uk-form-icon"></vk-icon>
                <input class="uk-input uk-form-blank" type="text" placeholder="搜索...">
              </div>
            </form>
          </vk-navbar-item>
        </vk-navbar-nav>

        <vk-navbar-nav slot="right">
          <vk-navbar-nav-item title="Active" active></vk-navbar-nav-item>
          <vk-navbar-nav-dropdown title="Parent">
            <vk-navbar-nav-dropdown-nav>
              <vk-nav-item title="Active" active></vk-nav-item>
              <vk-nav-item title="Item"></vk-nav-item>
              <vk-nav-item title="Item"></vk-nav-item>
            </vk-navbar-nav-dropdown-nav>
          </vk-navbar-nav-dropdown>
          <vk-navbar-nav-item title="Item"></vk-navbar-nav-item>
        </vk-navbar-nav>

      </vk-navbar>
    </header>
    <!--
    <header class="main-header">
      <a href="#" class="logo">
      ExpressPixel
    </a>
      <div class="search is-hidden">
        <form action="#0">
          <input type="search" placeholder="Search...">
        </form>
      </div>
      <a href="#" class="nav-trigger"><span></span></a>
      <nav class="nav">
        <ul class="top-nav">
          <li><a href="#events/calendar">Tour</a></li>
          <li><a href="#articles/comments">Support</a></li>
          <li class="has-children account">
            <a href="#">
            <img src="img/avatar.png" alt="avatar">
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
  -->
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
