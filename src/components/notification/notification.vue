<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div
      :class="['notification', 'notification-' + this.type]"
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
      verticalOffset: 0,
      delay: this.autoClose,
      height: 0,
      visible: false,
      type: 'info'
    }
  },
  computed: {
    style () {
      return {
        top: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    this.createTimer()
  },
  methods: {
    createTimer () {
      console.log(this.delay)
      if (this.delay) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.delay)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () {
      this.height = this.$el.offsetHeight
    },
    handleClose (e) {
      e.preventDefault()
      this.$emit('close')
    },
    afterLeave () {
      this.$emit('closed')
    },
  },
  beforeDestory () {
    this.clearTimer()
  },
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


