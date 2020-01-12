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
  display: inline-flex;
  background-color: #303030;
  color: rgba(255, 255, 255, 1);
  align-items: center;
  padding: 20px;
  min-width: 280px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
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


