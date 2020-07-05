// const docsLoader = require.resolve('./doc-loader') //vue文件自定义模块的loader
module.exports = (isDev) => {
	return {
		preserveWhitespace: true, //空格
		extractCSS: !isDev, //提取到css文件
		cssModules: {
			localIdentName: '[path]-[name]-[hash:base64:5]',
			camelCase: true,  //类名  驼峰的方法
		},
		loaders: {
			// 'docs': docsLoader
		},
		preloader: {  //先解析
		},
		postLoader:{ // 解析完再解析
		}  
	}
}
// postCss:  使用postcss.config.js配置
// hotReload: false, 热重载不会这样做