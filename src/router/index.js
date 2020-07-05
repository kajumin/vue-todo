import VueRouter from 'vue-router'
// import Login from '../views/login/login.vue'
import Todo from '../views/todo/Todo.vue'

export default () => {
  return new VueRouter({
    mode: 'history',
    // base: '/base/',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    scrollbehavior (to, from, savePosition) {
      if (savePosition) {
        return savePosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    // parseQuery (query) {

    // },
    // stringfiyQuery (obj) {

    // },
    fallback: true, // 浏览器不是全部都支持 不支持使用hash那套
    routes: [
      {
        path: '/',
        redirect: '/app'
      },
      {
        path: '/app',
        // path: '/app/:id',
        name: 'app',
        components: {
        	default: Todo,
        	a: () => import('../views/login/login.vue')
        },
        meta: {
          title: 'this is app',
          description: 'asdasd'
        },
        beforeEnter (to, from, next) {
        	console.log('app beforeEnter')
        	next()
        }
      },
      {
        path: '/login',
        component: () => import('../views/login/login.vue')
      },
      // {
      //   path: '/login/:id',
      //   component: () = > import('../views/login/login.vue'),
      //   props: true
      // },
      {
        path: '/login/:id',
        component: () => import('../views/login/login.vue'),
        props: (route) => ({ id: '456' })
      }
    ]
  })
}
