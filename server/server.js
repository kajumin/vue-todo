const Koa = require('koa')
const path = require('path')
const send = require('koa-send')

const app = new Koa()

const pageRouter = require('./routers/dev-ssr')
const apiRouter = require('./routers/api')
const userRouter = require('./routers/user')
const createDb = require('./db/db')
const config = require('../app.config')

const db = createDb(config.db.appId, config.db.appKey)

const isDev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
	try {
		console.log(`request with path ${ctx.path}`)
		await next()
	} catch(err){
		console.log(err)
		ctx.status = 500
		if (isDev) {
			ctx.body = err.message
		} else {
			ctx.body = 'please try again later'
		}
	}

})
app.use(async (ctx, next) => {
	// console.log('use db')
	ctx.db = db
	await next()
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '3333'

app.listen(PORT, HOST, () => {
	console.log(`server is listening on ${HOST}:${PORT}`)
})
