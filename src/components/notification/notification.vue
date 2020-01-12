<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div
      class="notification"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer">
      <render-cell :render="render" v-if="render"></render-cell>
      <span class="content" v-else>{{content}}</span>
      <a class="btn" @click="handleClose">{{btn}}</a>
    </div>
  </transition>
</template>

<script>
  import RenderCell from '../base/render'
export default {
  name: 'Notification',
  components: { RenderCell },
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: '关闭'
    },
    autoClose: {
      type: Number,
      default: 2000
    },
    render: Function,
  },
  data () {
    return {
      visible: true
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  methods: {
    handleClose (e) {
      e.preventDefault()
      this.$emit('close')
    },
    afterLeave () {
      this.$emit('closed')
    },
    afterEnter () {},
    clearTimer () {},
    createTimer () {}
  }
}
</script>

<style lang="less" scoped>
.notification{
  position: fixed;
  right: 10px;
  display: inline-flex;
  background: #f0faff;
  color: #2e8bf0;
  border: 1px solid #d4eeff;
  align-items: center;
  padding: 20px;
  min-width: 280px;
  flex-wrap: wrap;
  transition: all .3s;
}

.content {
  padding: 0;
  color: inherit;
}
.btn {
  color: #ff4081;
  padding-left: 24px;
  margin-left: auto;
  cursor: pointer;
}
</style>


