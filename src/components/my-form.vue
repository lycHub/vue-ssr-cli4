<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import {findComponentDownward} from "../utils/assist";

  export default {
    name: "myForm",
    provide() {
      return {
        form: this
      }
    },
    props: {
      model: {
        type: Object,
        default: {}
      },
      rules: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        error: '',
        memeryModel: null,
        formItems: []
      }
    },
    watch: {
      model: {
        handler(newVal) {
          if (!this.memeryModel) {
            this.memeryModel = { ...newVal };
          }
        },
        immediate: true
      }
    },
    methods: {
      addChild(child) {
        this.formItems.push(child);
      },
      validate(cb) {
        // const children = findComponentsDownward(this, 'myFormItem');
        const results = this.formItems.filter(child => child.prop).map(child => child.validate());
        cb(results.every(valid => valid));
      },
      resetFields() {
        // const children = findComponentsDownward(this, 'myFormItem');
        this.formItems.filter(child => child.prop).forEach(child => {
          const inputChild = findComponentDownward(child, 'myInput');
          inputChild.$emit('resetField', this.memeryModel[child.prop]);
        });
      }
    }
  }
</script>

<style scoped>

</style>