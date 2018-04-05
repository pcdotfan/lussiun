import Vue from 'vue'
import { DatePicker, TimeSelect, TimePicker, Select, Button } from 'element-ui'
require('element-theme-chalk/lib/icon.css')

export default () => {
  Vue.use({ DatePicker, TimeSelect, TimePicker, Select, Button })
}
