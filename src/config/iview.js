import Vue from 'vue'
/*自己的组件和iview的组件名字不能一样。起名不规范，死循环两行泪！*/
import 'iview/dist/styles/iview.css'

import {
  Button,
  FormItem,
  Form,
  Input,
  Layout,
  Submenu,
  MenuItem,
  Icon,
  Divider,
  Sider,
  Card,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  Header,
  Menu,
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

Vue.component('Button', Button)
Vue.component('FormItem', FormItem)
Vue.component('Form', Form)
Vue.component('Input', Input)
Vue.component('Layout', Layout)
Vue.component('Submenu', Submenu)
Vue.component('MenuItem', MenuItem)
Vue.component('Icon', Icon)
Vue.component('Divider', Divider)
Vue.component('Sider', Sider)
Vue.component('Card', Card)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('BreadcrumbItem', BreadcrumbItem)
Vue.component('Table', Table)
Vue.component('Header', Header)
Vue.component('Menu', Menu)
Vue.component('Page', Page)
Vue.component('Drawer', Drawer)
Vue.component('Upload', Upload)
Vue.component('iSwitch', Switch)
Vue.component('Col', Col)
Vue.component('Row', Row)
Vue.component('Select', Select)
Vue.component('Option', Option)
