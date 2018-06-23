const pkg = require('./package')

module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3333'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'PCDotFan',
    description: 'To be an life & code artisan',
    site: {
      title: 'PCDotFan',
      description: 'To be an life & code artisan',
      logo: 'https://pcdotfan.com/_cache/thumbnails/7/375a43a16479738d7504273c2184383_240_240_true_86.png'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#2889ED' },

  css: [
    { src: '~assets/scss/buefy-build.scss', lang: 'scss' },
    { src: 'font-awesome/css/font-awesome.min.css', lang: 'css' },
    '~assets/css/github.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/buefy'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    ['@nuxtjs/moment', ['zh-cn']]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: 'https://admin.oqo.moe/api',
    browserBaseURL: 'https://admin.oqo.moe/api'
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
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
