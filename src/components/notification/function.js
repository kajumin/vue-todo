import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1
const removeInstance = (instance) => {
	if (!instance) return
	const len = instances.length
	const index = instances.findIndex(inst => inst.id === instance.id)
	instances.splice(index, 1)

	if (len <= 1) return

	const removeHeight = instance.vm.$data.height
	// console.log(removeHeight, index, len)
	for (let i = index; i < len - 1; i++) {
		// console.log('remove')
		instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
	}
}

const notify = (options) => {
	if (Vue.prototype.$isServer) return

	const { autoClose, ...rest } = options
	const instance = new NotificationConstructor({
		propsData: {
			...rest
		},
		data: {
			autoClose: autoClose === undefined ? 5000 : autoClose
		}
	})
	const id = `notication-${seed++}`
	instance.id = id
	instance.vm = instance.$mount()
	document.body.appendChild(instance.vm.$el)
	instance.vm.$data.visible = true

	// 计算偏移量
	let verticalOffset = 0
	instances.forEach(item => {
		verticalOffset += item.$el.offsetHeight + 16
	})
	verticalOffset += 16
	instance.$data.verticalOffset = verticalOffset

	// 自动关闭和点击关闭
	instance.vm.$on('closed', () => {
		removeInstance(instance)
		document.body.removeChild(instance.vm.$el)
		instance.vm.$destroy()
	})
	instance.vm.$on('close', () => {
		instance.vm.$data.visible = false
	})

	instances.push(instance)
	// console.log(instance)
	return instance.vm
}

export default notify
