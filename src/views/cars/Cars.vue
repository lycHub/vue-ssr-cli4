<template>
  <div class="about">
    <h1>This is an Cars page</h1>
    <router-link to="/">Home</router-link>
    <my-form :model="formValues" :rules="formRules" ref="myForm">
      <my-form-item prop="username" label="用户名">
        <my-input v-model="formValues.username" placeholder="请填写名称" />
      </my-form-item>
      <my-form-item prop="password" label="密码">
        <my-input type="password" v-model="formValues.password" placeholder="请填写密码" />
      </my-form-item>
      <my-form-item>
        <van-button type="default" @click="onReset">重置</van-button>
        <van-button type="primary" @click="onSubmit">提交</van-button>
      </my-form-item>
    </my-form>
  </div>
</template>
<script>
  export default {
    name: 'Cars',
    metaInfo() {
      return this.$route.meta.metaInfo;
    },
    data() {
      return {
        formValues: {
          username: '',
          password: ''
        },
        formRules: {
          username: [
            { required: true, message: 'The name cannot be empty', trigger: 'change' }
          ],
          password: [
            { required: true, message: 'The password cannot be empty', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs['myForm'].validate(valid => {
          if (valid) {
            alert('ok');
          } else {
            console.log('error');
          }
        })
      },
      onReset() {
        this.$refs['myForm'].resetFields();
      }
    }
  }
</script>
<style lang="less" scoped>
  .about {
    h1 {
      color: #42b983;
    }
  }
</style>
