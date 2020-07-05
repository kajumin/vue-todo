const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverComplier = webpack(serverConfig)

const mfs = new MemoryFS()

serverComplier.outputFileSystem = mfs

let bundle

serverComplier.watch({}, (err, stats) => {
	if (err) throw err
	stats = stats.toJson()
	stats.errors.forEach(err => console.log(err))
	stats.warnings.forEach(err => console.warn(err))

	const bundlePath = path.join(
		serverConfig.output.path,
		'vue-ssr-server-bundle.json'
		)
	console.log(bundlePath)
	bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
	// console.log(bundle)
	console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
	console.log('dev-ssr.js handleSSR')
	if (!bundle) {
		ctx.body = '你等一会, 别着急...'
		return
	}
	const clientMainFestResp = await axios.get('http://127.0.0.1:8000/vue-ssr-client-manifest.json')
	console.log('dev-ssr.js handleSSR2')
	const clientMainfest = clientMainFestResp.data
	// console.log(clientMainfest)

	const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

	const renderer = VueServerRenderer.createBundleRenderer(bundle, {
		inject: false,
		clientMainfest
	})
	console.log('dev-ssr.js handleSSR3')
	await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('/(.*)', handleSSR)
module.exports = router
