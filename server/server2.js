const Koa = require('koa')
const path = require('path')
const send = require('koa-send')
const koaBody = require('koa-body')
const koaSession = require('koa-session')
const static = require('koa-static')
const cors = require('koa2-cors')
const history = require('koa-connect-history-api-fallback')

const app = new Koa()

const apiRouter = require('./routers/api')
const userRouter = require('./routers/user')
const createDb = require('./db/db')
const config = require('../app.config')

const db = createDb(config.db.appId, config.db.appKey)

const isDev = process.env.NODE_ENV === 'development'

// session配置
app.keys = ['vue ssr tech']
app.use(koaSession({
  key: 'v-ssr-id',
  maxAge: 2 * 60 * 60 * 1000
}, app))

// 跨域处理
app.use(cors())
app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  await next();
});

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
// 静态资源
app.use(history())
app.use(static(path.join(__dirname, '../public')))

app.use(async (ctx, next) => {

  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else if (ctx.path === '/') {
    await send(ctx, '/index.html', { root: path.join(__dirname, '../public') })
  } else {
    await next()
  }
})


app.use(koaBody())
app.use(async (ctx, next) => {
	console.log('use db')
	ctx.db = db
	await next()
})

app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '3333'

app.listen(PORT, HOST, () => {
	console.log(`server is listening on ${HOST}:${PORT}`)
})
