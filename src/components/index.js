import Vue from 'vue';
import MyInput from './my-input'
import MyForm from './my-form'
import MyFormItem from './my-form-item'
const comps = [MyInput, MyForm, MyFormItem];
comps.forEach(item => {
  Vue.component(item.name, item);
});