import Notification from './notification.vue'

export default {
	extends: Notification,
	data () {
		return {
			verticalOffset: 0,
			autoClose: 0,
			height: 0,
			visible: false
		}
	},
	computed: {
		style () {
			return {
				position: 'fixed',
				right: '20px',
				bottom: `${this.verticalOffset}px`
			}
		}
	},
	mounted () {
		this.createTimer()
	},
	methods: {
		createTimer () {
			console.log(this.autoClose)
			console.log(this.verticalOffset)
			if (this.autoClose) {
				this.timer = setTimeout(() => {
					this.visible = false
				}, this.autoClose)
			}
		},
		clearTimer () {
			if (this.timer) {
				clearTimeout(this.timer)
			}
		},
		afterEnter () {
			this.height = this.$el.offsetHeight
			console.log(this.height)
		}
	},
	beforeDestory () {
		this.clearTimer()
	}
}
