<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div
      :class="warpCls"
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
      default: ''
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
      visible: true,
      type: 'info'
    }
  },
  computed: {
    style () {
      return {}
    },
    warpCls() {
      return ['notification', 'notification-' + this.type]
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
  align-items: center;
  padding: 20px;
  min-width: 280px;
  flex-wrap: wrap;
  transition: all .3s;
}

.notification-info {
  background: #f0faff;
  color: #2e8bf0;
  border: 1px solid #d4eeff;
}

.notification-success {
  background: #edfff3;
  color: #19bf6c;
  border: 1px solid #bbf2cf;
}

.notification-error {
  background: #ffefe6;
  color: #ed3f13;
  border: 1px solid #ffcfb8;
}

.content {
  padding: 0;
  color: inherit;
}
.btn {
  padding-left: 24px;
  margin-left: auto;
  cursor: pointer;
}
</style>


