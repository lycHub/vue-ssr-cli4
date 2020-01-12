<template>
  <div>
    <input
      :type="type"
      :value="value"
      @input="onInput"
      v-bind="$attrs">
  </div>
</template>

<script>
  import {findComponentUpward} from "../utils/assist";

  export default {
    name: "myInput",
    inheritAttrs: false,
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    data() {
      return {
        val: ''
      }
    },
    mounted() {
      // console.log('$attrs', this.$attrs);
      this.$on('resetField', val => {
        this.$emit('input', val);
        this.$emit('on-change', val);
      });
    },
    watch: {
      value(newVal) {
        this.val = newVal;
      }
    },
    methods: {
      onInput(event) {
        const val = event.target.value;
        this.$emit('input', val);
        this.$emit('on-change', val);
        const parent = findComponentUpward(this, 'myFormItem');
        parent.$emit('validate');
      }
    }
  }
</script>

<style scoped>

</style>