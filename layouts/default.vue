<template>
  <div>
  <div class="container">
    <header>
      <div class="site-info">
        <h1 class="title">PCDotFan</h1>
        <h2 class="subtitle">To be a Life &amp; Code Artisan.</h2>
      </div>
    </header>
    <nuxt/>
  </div>
  <aside>
    <aside>
      <vk-grid gutter="small">
        <div class="uk-width-2-3">
        <h3>最新文章</h3>
        <ul class="list uk-list">
          <vk-grid gutter="small" class="uk-child-width-1-2">
          <li><a href="/post/code/ydkjs-async-and-concurrency">你不知道的 JavaScript - 异步和并发</a>
<span>21度</span>
          </li>
          <li><a href="/post/code/ydkjs-this">你不知道的 JavaScript - This</a>
<span>26度</span>
          </li>
          <li><a href="/post/code/ydkjs-hoisting">你不知道的 JavaScript - 提升</a>
<span>22度</span>
          </li>
          <li><a href="/post/code/ydkjs-scope">你不知道的 JavaScript - 作用域 / 左右值引用 / 词法作用域</a>
<span>45度</span>
          </li>
        </vk-grid>

        </ul>

      </div>
      
      <div class="uk-width-1-3">
        <h3>分门别类</h3>

        <ul class="list uk-list">
          <li><a href="/category/code">Code</a>
<span>14篇</span>

          </li>


          <li><a href="/category/writing">Writing</a>
<span>7篇</span>

          </li>
        </ul>
      </div>
      </vk-grid>
    </aside>
  </aside>
  <footer>
      <span>© 2018 PCDotFan - <a href="/feed">21 posts crafted</a>
    </span>
    <span>♥ <a href="https://blog.shuiba.co/bitcron-theme-hello">Hello</a>
    </span>

          <div class="powered_by"><span>Proudly published with</span>
    <a href="https://bitcron.com" target="_blank">Bitcron</a>

          </div>

          <div class="footer_slogan"><img src="/template/svg/slogan.svg">

          </div>
    </footer>
    <div class="totop">
      <a href="#" uk-totop uk-scroll></a>
    </div>
  </div>
</template>