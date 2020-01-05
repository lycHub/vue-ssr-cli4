<template>
  <div class="about">
    <h1>This is an Cars page</h1>
    <router-link to="/">Home</router-link>
  </div>
</template>
<script>
  export default {
    name: 'Cars',
    metaInfo() {
      return this.$route.meta.metaInfo;
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
