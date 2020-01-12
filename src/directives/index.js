import Vue from 'vue';
import ColorDirective from './color'
const directives = [ColorDirective];
directives.forEach(({ name, bind }) => {
  Vue.directive(name, bind);
});