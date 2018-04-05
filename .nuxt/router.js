import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _0da00e7b = () => import('../pages/login.vue' /* webpackChunkName: "pages/login" */).then(m => m.default || m)
const _2f4d3d20 = () => import('../pages/backend/topics/index.vue' /* webpackChunkName: "pages/backend/topics/index" */).then(m => m.default || m)
const _332291a4 = () => import('../pages/backend/dashboard/index.vue' /* webpackChunkName: "pages/backend/dashboard/index" */).then(m => m.default || m)
const _073e76b9 = () => import('../pages/backend/articles/index.vue' /* webpackChunkName: "pages/backend/articles/index" */).then(m => m.default || m)
const _020ea43a = () => import('../pages/backend/category/index.vue' /* webpackChunkName: "pages/backend/category/index" */).then(m => m.default || m)
const _65d9d3c3 = () => import('../pages/backend/profile/index.vue' /* webpackChunkName: "pages/backend/profile/index" */).then(m => m.default || m)
const _721aaf72 = () => import('../pages/backend/articles/new.vue' /* webpackChunkName: "pages/backend/articles/new" */).then(m => m.default || m)
const _43f86b64 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: '',
    linkExactActiveClass: 'uk-active',
    scrollBehavior,
    routes: [
		{
			path: "/login",
			component: _0da00e7b,
			name: "login"
		},
		{
			path: "/backend/topics",
			component: _2f4d3d20,
			name: "backend-topics"
		},
		{
			path: "/backend/dashboard",
			component: _332291a4,
			name: "backend-dashboard"
		},
		{
			path: "/backend/articles",
			component: _073e76b9,
			name: "backend-articles"
		},
		{
			path: "/backend/category",
			component: _020ea43a,
			name: "backend-category"
		},
		{
			path: "/backend/profile",
			component: _65d9d3c3,
			name: "backend-profile"
		},
		{
			path: "/backend/articles/new",
			component: _721aaf72,
			name: "backend-articles-new"
		},
		{
			path: "/",
			component: _43f86b64,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
