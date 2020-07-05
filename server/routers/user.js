const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'bang' && user.password === 'bang') {
  	// token 没有主动删除功能
    ctx.session.user = {
      username: 'bang'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'bang'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
