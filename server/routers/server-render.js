const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
	console.log('server-render')
	ctx.headers['Content-Type'] = 'text/html'

	const context = { url: ctx.path }

	try {
		const appString = await  renderer.renderToString(context)
		const { title } = context.meta.inject()
		// console.log(appString)
		// console.log('context', context)
		console.log(title)
		// console.log('state', context.renderState)
		console.log('style', context.renderStyles())
		console.log('scripts', context.renderScripts())
		const html = ejs.render(template, { 
			appString, 
			style: context.renderStyles(),
     		scripts: context.renderScripts(),
     		title: title.text()
		})
		ctx.body = html
		
	} catch (err) {
		if (err) {
			console.log('render error', err)
			throw err
		}
	}
}
