import Vue from 'vue'
import {
  Dialog,
  Autocomplete,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tag,
  Alert,
  Icon,
  Badge,
  Card,
  Rate,
  Collapse,
  CollapseItem,
  Cascader,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tag)
Vue.use(Alert)
Vue.use(Icon)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Rate)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Cascader)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
