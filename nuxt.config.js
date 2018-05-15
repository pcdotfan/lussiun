module.exports = {
  mode: "spa",
  /*
  ** Headers of the page
  */
  head: {
    title: "Lussiun",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#2889ED" },
  css: [
    { src: "~assets/less/uikit.theme.less", lang: "less" },
    { src: "~assets/sass/element-ui/index.scss", lang: "scss" },
    { src: "~assets/css/simplemde-theme-minimum.min.css" }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "@/plugins/uikit", ssr: false },
    { src: "@/plugins/vuex-router-sync", ssr: false },
    "@/plugins/element-ui"
  ],
  router: {
    linkActiveClass: "uk-active",
    linkExactActiveClass: "uk-active",
    middleware: ["auth"]
  },
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
  axios: {
    baseURL: "http://localhost:8080",
    browserBaseURL: "http://localhost:8080"
  },
  auth: {
    redirect: false,
    fetchUserOnLogin: false,
    strategies: {
      local: {
        endpoints: {
          login: { url: "/api/auth/login", method: "post", propertyName: "token" },
          logout: { url: "/api/auth/logout", method: "post" },
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
