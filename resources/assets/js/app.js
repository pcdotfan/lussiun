import Vue from 'vue'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// loads the Icon plugin
UIkit.use(Icons);
Vue.component('simplemde-editor', require('./components/SimplemdeEditor.vue'));

const app = new Vue({
  el: "#app"
})
