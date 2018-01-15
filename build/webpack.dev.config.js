//开发环境
const webpack = require('webpack')
const config = require('./webpack.config')
const WebpackDevServer = require('webpack-dev-server')
const PROT = 9000
const HOST ='127.0.0.1'
config.plugins = (config.plugins || []).concat([
	new webpack.HotModuleReplacementPlugin()
])

const options = {
	hot: true,
	open: true,
	inline: true,
	host: HOST,
	contentBase:'./public',
	historyApiFallback: {
		index: './index.html' //router为broswerHistory时刷新页面始终回到index
	},
	stats: {
		colors: true
	}
}

WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config)
const server = new WebpackDevServer(compiler, options)

server.listen(PROT,HOST,()=>{
	console.log(`服务端启动的链接地址为：http://${HOST}:${PROT}`)
})

