import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)

  instances.splice(index, 1)

  if (len <= 1) return;
  const removeHeight = instance.vm.height;
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset =
      parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

const notify = {
  show(type, options) {
    if (Vue.prototype.$isServer) return;
    const instance = new NotificationConstructor({
      propsData: options,
      data: {
        type
      }
    })

    const id = `notification_${seed++}`
    instance.id = id

    // 不传选择器，表示弹框dom已经生成好，只是没有插入到页面去，需要自己用dom方式手动挂载
    instance.vm = instance.$mount() // vue实例
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true

    let verticalOffset = 0
    instances.forEach(item => {
      verticalOffset += item.$el.offsetHeight + 16
    })
    verticalOffset += 16
    instance.verticalOffset = verticalOffset
    instances.push(instance)
    instance.vm.$on('closed', () => {
      removeInstance(instance)
      document.body.removeChild(instance.vm.$el)
      instance.vm.$destroy()
    })
    instance.vm.$on('close', () => {
      instance.vm.visible = false
    })
    return instance.vm
  },
  info(options) {
    this.show('info', options);
  },
  success(options) {
    this.show('success', options);
  },
  error(options) {
    this.show('error', options);
  }
}

export default notify
