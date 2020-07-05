<script>
	import tabContainer from './tab-container.vue'
export default {
  name: 'Tabs',
  provide () {
  	const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
  	// console.log(data.value)
  	return {
  		data
  	}
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      panes: []
    }
  },
  mounted () {
  	// setTimeout(() => {
  	// 	this.value = '2'
  	// }, 1000)
  },
  render () {
    return (
      <div class='tabs'>
        <ul class='tabs-header'>
          	{this.$slots.default}
        </ul>
        <tab-container panes = {this.panes}></tab-container>
      </div>
    )
  },
  methods: {
    onChange (index) {
    	// console.log(index)
     	this.$emit('change', index)
    }
  },
  components: {
  	tabContainer
  }
}
</script>
<style lang="styl" scoped>
.tabs-header {
  display flex
  list-style none
  margin 0
  padding 0
  border-bottom 2px solid #ededed
}
</style>
