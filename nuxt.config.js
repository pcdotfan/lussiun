module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Lussiun',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#2889ED' },
  css: [
    { src: '~assets/less/uikit.theme.less', lang: 'less' },
    { src: '~assets/sass/element.scss', lang: 'scss' },
    { src: '~assets/css/simplemde-theme-minimum.min.css' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/axios',
    { src: '@/plugins/vuex-router-sync', ssr: false },
    '@/plugins/vue-async-computed',
    '@/plugins/vuikit',
    { src: '@/plugins/vue-simplemde', ssr: false },
    { src: '@/plugins/element-ui', ssr: false }
  ],
  router: {
    middleware: ['auth'],
    linkActiveClass: 'uk-active',
    linkExactActiveClass: 'uk-active'
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['nuxt-validate', {
      lang: 'zh_CN'
    }],
    ['@nuxtjs/moment', { locales: ['zh-cn'], plugin: false }]
  ],
  axios: {
    baseURL: 'https://admin.oqo.moe/api',
    browserBaseURL: 'https://admin.oqo.moe/api'
  },
  auth: {
    fetchUserOnLogin: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get', propertyName: 'user' }
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [],
    extractCSS: true,
    babel: {
      plugins: [
        ['component', {
          libraryName: 'element-ui',
          style: false
        }]
      ]
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
