const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// console.log(process.env.NODE_ENV)
const isDev = process.env.NODE_ENV === 'development'
const config = {
	target: 'web',
	entry: path.join(__dirname, 'src/main.js'),
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist')
	},
	// watch: true,
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.jsx$/,
				use: ['babel-loader']
			},
			{
				test: /\.(jpg|png|jpeg|svg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 1024,
						name: '[name]-todo.[ext]',
						esModule: false	
					}
				}]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev?'"development"':'"production"'
			}
		}),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin(),
    ],
}
console.log(isDev)
if (isDev) {
	config.module.rules.push(
	{
		test: /\.styl$/,
		use: ['style-loader', 'css-loader',
			{ 
				loader: 'postcss-loader', 
				options: { sourceMap: true }
			},
			'stylus-loader']
	})
	config.devtool = '#cheap-module-eval-source-map'
	config.devServer = {
		port: 8000,
    	host: '0.0.0.0',
    	overlay: {
      		errors: true
    	},
    	// open:true  //每次都打开一个网页
    	hot: true, //只渲染一个组件
    	inline: true
  	}
	config.plugins.push(
    	new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoEmitOnErrorsPlugin(),
  	)
} else {
	// 外用库单独出来vendor.9d110bb9.js
	config.entry = {
		app: path.join(__dirname, 'src/main.js'),
		vendor: ['vue']
	}
	config.output.filename = '[name].[chunkhash:8].js'
	config.module.rules.push(
	{
		test: /\.styl$/,
		use: ExtractTextWebpackPlugin.extract({
			fallback: 'style-loader',
			use: [
			'css-loader',
			{ 
				loader: 'postcss-loader', 
				options: { sourceMap: true }
			},
			'stylus-loader']
		})
	})
	config.plugins.push(
		new ExtractTextWebpackPlugin('styles.[contentHash:8].css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime'
		})

	)
}
module.exports = config
