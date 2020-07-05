<template>
	<section class="real-app">
    <div class="tab-container">
      <!-- <tabs :value="tabValue" @change="handleChangeTab">
        <tab label="tab1" index="1">
          <span>tab content 1</span>
        </tab>
        <tab index="2">
          <span slot="label" style="color: red;">tab2</span>
          <span>tab content 2{{}}</span>
        </tab>
        <tab label="tab3" index="3">
          <span>tab content 3</span>
        </tab>
      </tabs> -->
      <tabs :value="filter" @change="handleChangeTab">
        <tab :label="tab" :index="tab" v-for="tab in states" :key="tab">
        </tab>
      </tabs>
    </div>
    
		<input type="text"
		class="add-input"
		autofocus="autofocus"
		placeholder="接下来要做什么?"
		@keyup.enter="handleAdd"
		>

		<item
		v-for="todo in filterTodos"
		:key="todo.id"
		:todo="todo"
		@del="deleteTodo"
    @toggle="toggleTodoState"
		>
		</item>

		<helper
		:filter="filter"
		:todos="todos"
		@toggle="toggleFilter"
		@clearCompleted = "clearCompleted"
		></helper>
	</section>
</template>
<script>
import Item from './item.vue'
import Helper from './tabs.vue'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      filter: 'all',
      states: ['all', 'active', 'completed']
    }
  },
  mounted () {
    this.fetchTodos()
  },
  beforeRouteEnter (to, from, next) {
    // 不能获取this  通过
    // next(vm => { console.log(vm.id)})
    console.log('todo beforeRouteEnter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('todo beforeRouteUpdate')
    if (window.confirm('are you sure?')) {
      next()
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log('todo beforeRouteLeave')
    next()
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'updateTodo',
      'deleteAllCompleted'
      ]),
    handleAdd (e) {
      const content = e.target.value.trim()
      if (!content) {
        this.$notify({
          content: '必须输入要做的内容'
        })
        return
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      // this.todos.unshift({
      //   id: Math.trunc(Math.random() * 10000),
      //   content: e.target.value.trim(),
      //   completed: false
      // })
      e.target.value = ''
    },
    // deleteTodo (id) {
    //   this.todos = this.todos.filter(item => item.id !== id)
    // },
    toggleFilter (state) {
      this.filter = state
    },
    clearCompleted () {
      // this.todos = this.todos.filter(item => !item.completed)
      this.deleteAllCompleted()
    },
    handleChangeTab (value) {
      // console.log(value)
      this.filter = value
    },
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    }
  },
  components: {
    Item,
    Helper
  },
  computed: {
    ...mapState(['todos']),
    filterTodos () {
      if (this.filter === 'all') {
        return this.todos
      } else {
        const completed = this.filter === 'completed'
        return this.todos.filter(item => item.completed === completed)
      }
    }
  }
}
</script>
<style scoped lang="styl">
.tab-container {
  background-color white
  padding 10px
}
.real-app {
	width 600px
	margin 0 auto
	box-shadow 0 0 5px #666
}
.add-input {
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4em
    border none
    outline none
    color inherit
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 36px
    border none
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
}
</style>
