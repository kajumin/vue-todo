const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const cdnConfig = require('../app.config').cdn
// console.log(process.env.NODE_ENV)

const isDev = process.env.NODE_ENV === 'development'
console.log(isDev)

const baseConfig = require('./webpack.config.base.js')

const basePlugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: isDev?'"development"':'"production"'
		}
	}),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin(),
    new VueClientPlugin()
]
let config
const devServer = {
	port: 8000,
	host: '0.0.0.0',
	overlay: {
  		errors: true
	},
	headers: { 'Access-Control-Allow-Origin': '*'},
	historyApiFallback: {
		index: '/public/index.html'
	},
	proxy: {
		'/api': 'http://127.0.0.1:3333',
		'/user': 'http://127.0.0.1:3333'
	},
	// open:true  //每次都打开一个网页
	hot: true, //只渲染一个组件
	inline: true
}
if (isDev) {
	config = merge(baseConfig, {
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
		plugins: basePlugins.concat([
			new webpack.HotModuleReplacementPlugin(),
    		new webpack.NoEmitOnErrorsPlugin(),
		])
	})
} else {
	// 外用库单独出来vendor.9d110bb9.js
	config = merge(baseConfig, {
		entry: {
			app: path.join(__dirname, '../src/main.js'),
			vendor: ['vue']
		},
		output: {
			filename: '[name].[chunkhash:8].js',
      		// publicPath: '/'
      		publicPath: cdnConfig.host
		},
		module: {
			rules: [
				{
					test: /\.styl$/,
					use: ExtractTextWebpackPlugin.extract({
						fallback: 'vue-style-loader',
						use: [
						'css-loader',
						{ 
							loader: 'postcss-loader', 
							options: { sourceMap: true }
						},
						'stylus-loader']
					})
				}
			]
		},
		plugins: basePlugins.concat([
			new ExtractTextWebpackPlugin('styles.[contentHash:8].css'),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor'
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'runtime'
			}),
      		new webpack.NamedChunksPlugin()
		])
	})
}

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../src/model/client-model.js')
  }
}

module.exports = config
