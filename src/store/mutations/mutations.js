export default {
  updateCount (state, { num, num2 }) {
    // console.log(state)
    // console.log(num2)
    state.count = num
  },
  fillTodos (state, todos) {
  	state.todos = todos
  },
  addTodo (state, todo) {
  	state.todos.unshift(todo)
  },
  updateTodo (state, { id, todo }) {
  	state.todos.splice(state.todos.findIndex(item => item.id === id), 1, todo)
  },
  deleteTodo (state, id) {
  	state.todos.splice(state.todos.findIndex(item => item.id === id), 1)
  },
  deleteAllCompleted (state) {
  	state.todos = state.todos.filter(item => !item.completed)
  },
  doLogin (state, data) {
  	state.username = data
  }
}
