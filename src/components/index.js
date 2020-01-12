import Vue from 'vue';
import MyInput from './my-input'
import MyForm from './my-form'
import MyFormItem from './my-form-item'
import Notification from './notification/notification.vue'
import notify from './notification'
const comps = [MyInput, MyForm, MyFormItem, Notification];
comps.forEach(item => {
  Vue.component(item.name, item);
});

Vue.prototype.$notify = notify;
