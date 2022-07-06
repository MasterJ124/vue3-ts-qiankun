module.exports = {
	// 设置全局化统一样式前缀，隔离子应用样式
	css: {
		loaderOptions: {
			less: {
				modifyVars: {
					'@ant-prefix': 'main-ant'
				},
				javascriptEnabled: true
			}
		}
	},
	devServer: {
		inline: true,
		port: 8080,
		proxy: {
			'/api': {
				target: 'http://api-saas.ad.test.netjoy.com',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			},
			'/pre': {
				target: 'http://api-pre.ad.netjoy.com',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					'^/pre': ''
				}
			},
			'/account': {
				target: 'http://api.data.test.netjoy.com/',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					'^/account': ''
				}
			},
			'/dingtalk': {
				target: 'http://api.open.netjoy.com/',
				ws: false,
				changeOrigin: true,
				pathRewrite: {
					'^/dingtalk': ''
				}
			}
		}
	},
	productionSourceMap: false,
	lintOnSave: undefined,
	transpileDependencies: ['vuex-persist']
};
