var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

//相当于通过本地node服务代理请求到了http: //sale-dev.ptdev.cn
var proxy = [{
	path: '/*/*', //必须得有一个文件地址，如果顶层文件夹名字不同，则用/*/代替
	target: 'http://sale.putao.com',
	host: 'sale.putao.com'
}];
var server = new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	proxy: proxy
});

//将其他路由，全部返回index.html
server.app.get('*', function(req, res) {
	res.sendFile(__dirname + '/index.html')
});
server.listen(8080, function() {
	console.log('正常打开8080端口')
});