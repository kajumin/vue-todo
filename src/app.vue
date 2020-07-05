<template>
	<div id="app" class="app">
		<div class="cover"></div>
		<Header></Header>
		<!-- <p>store:{{$store.state.count}}</p>
		<p>state:{{counter}}</p>
		<p>getters:{{fullName}}</p>
		<p>a模块text: {{$store.state.a.text}}</p>
		<p>b模块text: {{$store.state.a.text}}</p>
		<router-link :to="{name:'app'}">todo</router-link>
		<router-link to="/app/123">todo/123</router-link>
		<router-link to="/app/456">todo/456</router-link>
		<router-link to="/login">login</router-link>
		<router-link to="/login/123">login/123</router-link> -->
		<transition name="fade">
			<router-view></router-view>
		</transition>	  
		<!-- <router-view name="a"></router-view> -->
    <button @click="notify">添加</button>
    <router-link to="/login">登录</router-link>
    <!-- <notification content="test notification"></notification> -->
		<Footer></Footer>
	</div>
</template>

<script>
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
import { mapState, mapGetters } from 'vuex'
export default {
  metaInfo () {
  	return {
  		title: 'this is app2 page',
  		meta: [
            {
            	name: 'keywords',
            	content: 'keywords'
            }, {
            	name: 'description',
            	content: 'description'
            }
        ]
  	}
  },
  data () {
    return {
      msg: 'abc'
    }
  },
  created () {
  	this.$store.dispatch('updateCountAsync', {
  		num: 5,
  		time: 2000
  	})
    
  	// this.$store.state.count = 3 //报错
  },
  methods: {
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
  },
  components: {
    Header,
    Footer
  },
  computed: {
  	...mapState({
  		counter: 'count'
  	}),
  	...mapGetters(['fullName'])
  }
}
</script>

<style scoped lang="styl">
.app{
	position relative
	height 100%
	.cover{
		position absolute
		top 0
		left 0
		bottom 0
		right 0
		background-color #999
		opacity 0.9
		z-index -1
	}
}
.fade-enter-active, .fade-leave-active {
	transition opacity 1.5s
}
.fade-enter, .fade-leave-to {
	opacity 0
}
</style>
