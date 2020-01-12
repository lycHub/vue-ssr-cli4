<template>
  <div>
    <label v-show="label">{{label}}</label>
    <slot></slot>
    <p v-show="error">{{error}}</p>
  </div>
</template>

<script>
  import Schema from 'async-validator';
  import {findComponentUpward} from "../utils/assist";
  export default {
    name: "myFormItem",
    inject: ['form'],
    props: {
      label: {
        type: String,
        default: ''
      },
      prop: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        error: ''
      }
    },
    methods: {
      validate() {
        let valid = true;
        const rules = this.form.rules[this.prop];
        const value = this.form.model[this.prop];
        const descriptor = { [this.prop]: rules };
        const schema = new Schema(descriptor);
        // 返回的是Promise<boolean>
        schema.validate({ [this.prop]: value }, errors => {
          if (errors) {
            console.log('errors', errors);
            this.error = errors[0].message;
            valid = false;
          } else {
            this.error = '';
          }
        });
        return valid;
      },


    },
    created() {
      // console.log('form', this.form);
    },
    mounted() {
      this.$on('validate', this.validate);
      const parent = findComponentUpward(this, 'myForm');
      parent.addChild(this);
    }
  }
</script>

<style scoped>

</style>