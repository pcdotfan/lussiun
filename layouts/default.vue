<template>
<div>
    <header>
      <a href="/" class="logo">
          <img src="/_cache/thumbnails/7/375a43a16479738d7504273c2184383_240_240_true_86.png">
      </a>
      <div class="description">
          <h1>PCDotFan</h1>
          <h2>To be a Life &amp; Code Artisan.</h2>
          <nav>
              <div class="bitcron_nav_container">
                  <div class="bitcron_nav">
                      <div class="mixed_site_nav_wrap site_nav_wrap">
                          <ul class="mixed_site_nav site_nav sm sm-base">
                              <li>
                                  <a id="db8d7c6bc6ed911e885290242ac110004" href="/" class="selected active current nav__item">首页</a>
                              </li>
                              <li>
                                  <a id="db8d7d8006ed911e885290242ac110004" href="/archive" class=" nav__item">归档</a>
                              </li>
                              <li>
                                  <a id="db8d7e5de6ed911e885290242ac110004" href="/feed" class=" nav__item">订阅</a>
                              </li>
                          </ul>
                          <div class="clear clear_nav_inline_end"></div>
                      </div>
                  </div>
                  <div class="clear clear_nav_end"></div>
              </div>
          </nav>
      </div>
  </header>
  <div class="wrapper">
    <main>
        <article-list></article-list>
        <section class="list-pager">
            <a href="/page/2" class="next">下一页
                <i class="fa fa-angle-right"></i>
            </a>
            <div class="clear"></div>
        </section>
    </main>
  </div>
  <aside>
    <div class="aside-left sidebar">
        <h3>最新文章</h3>
        <ul>
            <li>
                <a href="/post/code/laravel-socialite-practice">Laravel Socialite 实践</a>
                <span>95度</span>
            </li>
        </ul>
        <div class="clear"></div>
    </div>
    <div class="aside-right sidebar">
        <h3>分门别类</h3>
        <ul>
            <li>
                <a href="/category/code">Code</a>
                <span>14篇</span>

            </li>
        </ul>
    </div>
  </aside>
  <footer>
    <span>© 2018 PCDotFan -
        <a href="/feed">21 posts crafted</a>
    </span>
    <span>♥
        <a href="https://blog.shuiba.co/bitcron-theme-hello">Hello</a>
    </span>
    <div class="powered_by">
        <span>Proudly published with </span>
        <a href="https://bitcron.com" target="_blank">Lussiun</a>
    </div>
    <div class="footer_slogan">
        <img src="~assets/images/slogan.svg">
    </div>
</footer>
</div>
</template>

<script>
import ArticleList from '@/components/ArticleList'
export default {
  name: 'Default',
  components: {
    ArticleList
  }
}
</script>
