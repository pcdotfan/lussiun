<template>
  <header id="header" class="uk-background-primary uk-light">
    <nav class="uk-navbar-primary"  uk-navbar uk-sticky="bottom: .hero">
      <div class="uk-navbar-left">
        <a href="#" class="uk-navbar-item uk-logo"><img uk-svg src="../../assets/images/uikit-logo.svg" class="uk-margin-small-right">Lussiun</a>
        <ul class="uk-navbar-nav">
          <router-link tag="li" to="/backend/dashboard">
            <a>
              <div class="">
                控制面板
                <div class="uk-navbar-subtitle">Dashboard</div>
              </div>
            </a>
          </router-link>
          <router-link tag="li" to="/backend/articles">
            <a>
              <div class="">
                文章
                <div class="uk-navbar-subtitle">Articles</div>
              </div>
            </a>
          </router-link>
          <router-link tag="li" to="/backend/category">
            <a>
              <div class="">
                分类目录
                <div class="uk-navbar-subtitle">Category</div>
              </div>
            </a>
          </router-link>
          <router-link tag="li" to="/backend/settings">
            <a>
              <div class="">
                设置
                <div class="uk-navbar-subtitle">Settings</div>
              </div>
            </a>
          </router-link>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <ul class="navbar-right-controls uk-iconnav">
            <li><a href="#" uk-icon="icon: plus; ratio: 0.875"></a></li>
            <li><a href="#" uk-icon="icon: file-edit; ratio: 0.875"></a></li>
            <li><a href="#" uk-icon="icon: copy; ratio: 0.875"></a></li>
            <li><a href="#" uk-icon="icon: trash; ratio: 0.875"></a></li>
            <li><a href="/index.php/admin/user/edit?id=1" title="Profile"><img class="uk-border-circle uk-margin-small-right" height="32" width="32" title="wwy701" src="https://avatars1.githubusercontent.com/u/3370745?s=460"><span>wwy701</span></a></li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'DHeader',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}

</script>
