import Vue from 'vue';
export default {
  name: 'color-swatch',
  bind(el, binding) {
    el.addEventListener('click', function () {
      this.style.color = binding.value || '#f60';
    });
  }
}