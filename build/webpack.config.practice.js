const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// console.log(process.env.NODE_ENV)

const baseConfig = require('./webpack.config.base.js')

const basePlugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"development"'
		}
	}),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: path.join(__dirname, './index.html') }),
]
let config
const devServer = {
	port: 8080,
	host: '0.0.0.0',
	overlay: {
  		errors: true
	},
	// open:true  //每次都打开一个网页
	hot: true, //只渲染一个组件
	inline: true
}

config = merge(baseConfig, {
	entry: path.join(__dirname, '../practice/index.js'),
	devtool: '#cheap-module-eval-source-map',
	module: {
		rules: [
			{
				test: /\.styl$/,
				use: ['vue-style-loader', 'css-loader',
					{ 
						loader: 'postcss-loader', 
						options: { sourceMap: true }
					},
					'stylus-loader']
			}
		]
	},
	devServer,
	resolve: {
		alias: {  //设置有没有template  esm可以有tempalte
			'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
		}
	},
	plugins: basePlugins.concat([
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	])
})


module.exports = config
