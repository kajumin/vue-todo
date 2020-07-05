const path = require('path')
// console.log(process.env.NODE_ENV)

const vueLoader = require('./vue-loader.config.js')
const isDev = process.env.NODE_ENV === 'development'

const config = {
	target: 'web',
	entry: path.join(__dirname, '../src/main.js'),
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '../public'),
		publicPath: 'http://127.0.0.1:8000/public/'
	},
	// watch: true,
	module: {
		rules: [
			{
				test: /\.(vue|js|jsx)$/,
				loader: 'eslint-loader',
				exclude: /node_nodules/,
				enforce: 'pre' // 预处理
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoader(isDev)
			},
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			},
			{
				test: /\.jsx$/,
				use: ['babel-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_nodules/,
				use: ['babel-loader']
			},
			{
				test: /\.(jpg|png|jpeg|svg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 1024,
						name: 'resources/[name].[hash:8].[ext]',
						esModule: false
					}
				}]
			}
		]
	}
}
module.exports = config
