import Vue from 'vue'
import 'iview/dist/styles/iview.css'

import {
  FormItem,
  Form,
  Input,
  Table,
  Page,
  Drawer,
  Upload,
  Row,
  Switch,
  Col,
  Select,
  Option,
  Notice,
  Message,
  Modal
} from 'iview'

Vue.prototype.$Notice = Notice
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

Vue.component('FormItem', FormItem)
Vue.component('Form', Form)
Vue.component('Input', Input)
Vue.component('Table', Table)
Vue.component('Page', Page)
Vue.component('Drawer', Drawer)
Vue.component('Upload', Upload)
Vue.component('iSwitch', Switch)
Vue.component('Col', Col)
Vue.component('Row', Row)
Vue.component('Select', Select)
Vue.component('Option', Option)
