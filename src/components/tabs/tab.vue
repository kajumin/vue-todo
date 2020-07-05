<script>
export default {
  name: 'Tab',
  inject: ['data'],
  props: {
    index: {
      required: true,
      type: [Number, String]
    },
    label: {
      type: String,
      default: 'tab'
    }
  },
  mounted () {
    this.$parent.panes.push(this)
  },
  computed: {
    active () {
      // console.log(this.value)
      return this.data.value === this.index
      // return this.$parent.value === this.index
    }
  },
  methods: {
    handleClick () {
      // console.log(this.index)
      this.$parent.onChange(this.index)
    }
  },
  render () {
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active
    }
    return (
      <li class={classNames} on-click={this.handleClick}>
        {tab}
      </li>
    )
  }
}
</script>

<style lang="styl" scoped>
.tab {
  list-style none
  line-height 40px
  margin-right 30px
  position relative
  bottom -2px
  cursor pointer
  &.active {
    border-bottom 2px solid blue
  }
  &:last-child {
    margin-right 0
  }
}
</style>
