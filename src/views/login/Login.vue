<template>
	<form class="login-form" @submit="doSubmit">
		<h1>
			<span>Login</span>
			<span class="error-msg" v-show="errorMsg">{{errorMsg}}</span>
		</h1>
		<input 
		type="text" 
		name="username" 
		class="login-input"
		v-model="username" 
		placeholder="User Name">
		<input 
		type="password" 
		name="password" 
		class="login-input" 
		v-model="password" 
		autocomplete="new-password"
		placeholder="Password">
		<button type="submit" class="login-btn">登录</button>
		
	</form>
</template>
<script>
import { mapActions } from 'vuex'
	export default {
		props: ['id'],
		data () {
			return {
				username: '',
				password: '',
				errorMsg: ''
			}
		},
		methods: {
			...mapActions(['login']),
			doSubmit (e) {
				e.preventDefault()
				if (this.validata()) {
					// 调用接口
					this.login({
						username: this.username,
						password: this.password
					})
					.then(res => {
						console.log('登录成功!')
						this.$router.replace('/app')
					})
				}
			},
			validata () {
				if (!this.username.trim()) {
					this.errorMsg = '姓名不能为空'
					return false
				} else if (!this.password.trim()) {
					this.errorMsg = '密码不能为空'
					return false
				} else {
					this.errorMsg = ''
					return true
				}
			}
		},
		mounted () {
			console.log(this.$route.params)
			console.log(this.id)
		}
	}
</script>
<style lang="styl" scoped>
.login-form {
  display flex
  flex-direction column
  align-items flex-start
  width 350px
  margin 0 auto
  padding 20px
  background-color #fff
  h1 {
    font-weight 100
    color #3d3d3d
  }
}
.login-input {
  appearance none
  padding-left 10px
  line-height 30px
  margin-bottom 20px
  border 1px solid #aaa
  box-sizing border-box
  width 100%
  border-radius 0
  box-shadow 0 0 0
}
.login-btn {
  appearance none
  width 100%
  line-height 30px
  text-align center
  background-color #0d60c7
  color #eaeaea
  cursor pointer
  border-color #0d60c7
  transition all .3s
  &:hover {
    color #fff
    background-color darken(#0d60c7, 10)
  }
}
.error-msg {
  font-size 12px
  color red
}
@media screen and (max-width: 600px) {
  .login-form {
    width 90%
  }
  .login-input{
    line-height 40px
  }
}
</style>
